import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  Lookup,
  RequiredRule,
  Scrolling,
  StringLengthRule,
} from "devextreme-react/data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../contexts/navigation";
import { DxStoreService, GetService } from "../../services";
import { EducationType, Lesson } from "../../models";
import ClassLessonAssign from "./class-lesson.assign.component";
import DataSource from "devextreme/data/data_source";

const CLASS_SERVICE = "CLASS";
const LESSON_SERVICE = "LESSON";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();

  const [classDS, setClassDS] = useState<DataSource>(undefined);
  const [lessonDS, setLessonDS] = useState<DataSource>(undefined);
  const [lessonList, setLessonList] = useState<Lesson[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    setClassDS(
      DxStoreService.getStore({
        key: "id",
        load: (options) => {
          return GetService.get(CLASS_SERVICE)?.getAll() ?? [];
        },
        insert: (values) => {
          return (
            GetService.get(CLASS_SERVICE)?.insert(values) ??
            Promise.resolve(undefined)
          );
        },
        update: (key, values) => {
          return (
            GetService.get(CLASS_SERVICE)?.modify(key, values) ??
            Promise.resolve(undefined)
          );
        },
        remove: (key) => {
          return (
            GetService.get(CLASS_SERVICE)?.remove(key) ??
            Promise.resolve(undefined)
          );
        },
        onInserted: (values, key) => classGrid?.current?.instance?.refresh(),
        onRemoved: (key) => classGrid?.current?.instance?.refresh(),
        onUpdated: (values, key) => classGrid?.current?.instance?.refresh(),
      })
    );

    setLessonDS(
      DxStoreService.getStore({
        key: "id",
        load: async (options) => {
          const lessonList: Lesson[] =
            ((await GetService.get(LESSON_SERVICE)?.getAll()) as Lesson[]) ??
            [];
          setLessonList(lessonList);
          return Promise.resolve(lessonList);
        },
        insert: (values) => {
          return (
            GetService.get(LESSON_SERVICE)?.insert(values) ??
            Promise.resolve(undefined)
          );
        },
        update: (key, values) => {
          return (
            GetService.get(LESSON_SERVICE)?.modify(key, values) ??
            Promise.resolve(undefined)
          );
        },
        remove: (key) => {
          return (
            GetService.get(LESSON_SERVICE)?.remove(key) ??
            Promise.resolve(undefined)
          );
        },
        onInserted: (values, key) => lessonGrid?.current?.instance?.refresh(),
        onRemoved: (key) => lessonGrid?.current?.instance?.refresh(),
        onUpdated: (values, key) => lessonGrid?.current?.instance?.refresh(),
      })
    );
  }, [setNavigationData, currentPath]);

  const classGrid = useRef(null);
  const lessonGrid = useRef(null);

  const educationTypeList = Object.keys(EducationType).map((et) => {
    return {
      id: et,
      name: t(`enums.education-type.${et.toLowerCase()}`),
    };
  });

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("class-lesson.title")}</h2>
      <div className={"content-block dx-card responsive-paddings"}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <div className="dx-card-title">{t("class-lesson.classes")}</div>
            <DataGrid
              ref={classGrid}
              className={"dx-card wide-card"}
              dataSource={classDS}
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
                dataField={"name"}
                caption={t("class-lesson.name")}
                dataType={"string"}
              >
                <StringLengthRule max={100} />
                <RequiredRule />
              </Column>

              <Column
                dataField={"educationType"}
                caption={t("class-lesson.education-type")}
                dataType={"string"}
              >
                <Lookup
                  dataSource={educationTypeList}
                  displayExpr={"name"}
                  valueExpr={"id"}
                />
                <RequiredRule />
              </Column>
            </DataGrid>
          </div>
          <div>
            <div className="dx-card-title">{t("class-lesson.lessons")}</div>
            <DataGrid
              ref={lessonGrid}
              className={"dx-card wide-card"}
              dataSource={lessonDS}
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
                dataField={"name"}
                caption={t("class-lesson.name")}
                dataType={"string"}
              >
                <StringLengthRule max={100} />
                <RequiredRule />
              </Column>
            </DataGrid>
          </div>
        </div>
      </div>
      <div className={"content-block dx-card responsive-paddings"}>
        <ClassLessonAssign lessonDS={lessonList} classDS={classDS} />
      </div>
    </React.Fragment>
  );
};
