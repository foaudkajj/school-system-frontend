import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  Lookup,
  RequiredRule,
  Scrolling,
  StringLengthRule,
} from "devextreme-react/data-grid";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import DxStoreService from "../../services/dx-store.service";
import DataSource from "devextreme/data/data_source";
import GetService from "../../services/get.service";

const SERVICE_NAME = "TEACHER";

export default (props: any) => {
  const { t } = useTranslation();
  const genderList = [
    {
      id: "Male",
      name: t("teacher.male"),
    },
    {
      id: "Female",
      name: t("teacher.female"),
    },
  ];

  const gridEditorPreparing = (e) => {
    if (e.parentType === "dataRow" && e.dataField === "gsm") {
      e.rtlEnabled = false;
    }
  };

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
      <h2 className={"content-block"}>{t("teacher.title")}</h2>
      <div className={"content-block responsive-paddings"}>
        <div className={"dx-card responsive-paddings"}>
          <DataGrid
            ref={grid}
            className={"dx-card wide-card"}
            dataSource={store}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}
            wordWrapEnabled={true}
            allowColumnReordering={true}
            onEditorPreparing={gridEditorPreparing}
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
              dataField={"name"}
              caption={t("teacher.name")}
              dataType={"string"}
            >
              <StringLengthRule max={50} />
              <RequiredRule />
            </Column>

            <Column
              dataField={"surname"}
              caption={t("teacher.surname")}
              dataType={"string"}
            >
              <StringLengthRule max={50} />
              <RequiredRule />
            </Column>

            <Column
              dataField={"gender"}
              caption={t("teacher.gender")}
              dataType={"string"}
            >
              <Lookup
                dataSource={genderList}
                displayExpr={"name"}
                valueExpr={"id"}
              />
              <RequiredRule />
            </Column>

            <Column
              dataField={"trName"}
              caption={t("teacher.tr-name")}
              dataType={"string"}
            >
              <StringLengthRule max={50} />
              <RequiredRule />
            </Column>

            <Column
              dataField={"trSurname"}
              caption={t("teacher.tr-surname")}
              dataType={"string"}
            >
              <StringLengthRule max={50} />
              <RequiredRule />
            </Column>

            <Column
              dataField={"gsm"}
              caption={t("teacher.gsm")}
              dataType={"string"}
              editorOptions={{ mask: "(999)999-9999", rtlEnabled: false }}
            ></Column>

            <Column
              dataField={"identityNo"}
              caption={t("teacher.identity-no")}
              dataType={"string"}
            >
              <RequiredRule />
              <StringLengthRule max={20} />
            </Column>
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};
