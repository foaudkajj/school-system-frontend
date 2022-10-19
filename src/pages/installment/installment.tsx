import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  Lookup,
  RangeRule,
  RequiredRule,
  Scrolling,
} from "devextreme-react/data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DataSource from "devextreme/data/data_source";
import { Student } from "../../models";
import { useNavigation } from "../../contexts/navigation";
import { DxStoreService, GetService, StudentService } from "../../services";

const SERVICE_NAME = "INSTALLMENT";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();

  const { t } = useTranslation();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    StudentService.getAll().then((res: Student[]) => {
      setStudentList(res);
    });

    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
  }, [currentPath, setNavigationData]);

  const grid = useRef(null);

  const store: DataSource = DxStoreService.getStore({
    key: "id",
    load: (options) => {
      return GetService.get(SERVICE_NAME)?.getAll() ?? [];
    },
    insert: (values) => {
      return (
        GetService.get(SERVICE_NAME)?.insert(values) ??
        Promise.resolve(undefined)
      );
    },
    update: (key, values) => {
      return (
        GetService.get(SERVICE_NAME)?.modify(key, values) ??
        Promise.resolve(undefined)
      );
    },
    remove: (key) => {
      return (
        GetService.get(SERVICE_NAME)?.remove(key) ?? Promise.resolve(undefined)
      );
    },
    onInserted: (values, key) => grid?.current?.instance?.refresh(),
    onRemoved: (key) => grid?.current?.instance?.refresh(),
    onUpdated: (values, key) => grid?.current?.instance?.refresh(),
  });

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("installment.title")}</h2>
      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          ref={grid}
          className={"dx-card wide-card"}
          dataSource={store}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          wordWrapEnabled={true}
          allowColumnReordering={true}
        >
          <Scrolling columnRenderingMode={"virtual"} />
          <Editing
            mode={"form"}
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          ></Editing>

          <Column
            dataField={"id"}
            caption={"id"}
            dataType={"string"}
            visible={false}
            formItem={{ visible: false }}
          />

          <Column
            dataField={"studentId"}
            caption={t("installment.student")}
            dataType={"string"}
          >
            <RequiredRule />
            <Lookup
              dataSource={studentList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
          </Column>

          <Column
            dataField={"date"}
            caption={t("installment.date")}
            dataType={"date"}
          >
            <RequiredRule />
          </Column>

          <Column
            dataField={"amount"}
            caption={t("installment.amount")}
            dataType={"number"}
          >
            <RangeRule
              min={1}
              message={t("installment.amount-min-validation")}
            />
            <RequiredRule />
          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
