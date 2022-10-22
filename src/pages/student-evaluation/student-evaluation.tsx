import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  Lookup,
  RequiredRule,
  Scrolling,
} from "devextreme-react/data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DataSource from "devextreme/data/data_source";
import { Attendance, Evaluation, Student } from "../../models";
import { useNavigation } from "../../contexts/navigation";
import { DxStoreService, GetService, StudentService } from "../../services";

const SERVICE_NAME = "STUDENT_EVALUATION";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();

  const { t } = useTranslation();
  const [studentList, setStudentList] = useState([]);

  const attendanceList = Object.keys(Attendance).map((at) => {
    return {
      id: at,
      name: t(`enums.attendance.${at.toLowerCase()}`),
    };
  });

  const evaluationList = Object.keys(Evaluation).map((at) => {
    return {
      id: at,
      name: t(`enums.evaluation.${at.toLowerCase()}`),
    };
  });

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

  const gridEditorPreparing = (e) => {
    if (e.parentType === "dataRow" && e.dataField === "note") {
      e.editorName = "dxTextArea";
    }
  };

  const gridInitNewRow = (e) => {
    e.data.date = new Date();
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("student-evaluation.title")}</h2>
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
          onEditorPreparing={gridEditorPreparing}
          onInitNewRow={gridInitNewRow}
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
            caption={t("student-evaluation.student")}
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
            caption={t("student-evaluation.date")}
            dataType={"date"}
          >
            <RequiredRule />
          </Column>

          <Column
            dataField={"attendance"}
            caption={t("student-evaluation.attendance")}
            dataType={"string"}
          >
            <Lookup
              allowClearing={true}
              dataSource={attendanceList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
          </Column>

          <Column
            dataField={"participation"}
            caption={t("student-evaluation.participation")}
            dataType={"string"}
          >
            <Lookup
              allowClearing={true}
              dataSource={evaluationList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
          </Column>

          <Column
            dataField={"homework"}
            caption={t("student-evaluation.homework")}
            dataType={"string"}
          >
            <Lookup
              allowClearing={true}
              dataSource={evaluationList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
          </Column>

          <Column
            dataField={"behaviour"}
            caption={t("student-evaluation.behaviour")}
            dataType={"string"}
          >
            <Lookup
              allowClearing={true}
              dataSource={evaluationList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
          </Column>

          <Column
            dataField={"note"}
            caption={t("student-evaluation.note")}
            dataType={"string"}
          />
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
