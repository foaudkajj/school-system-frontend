import { DataGrid, SelectBox } from "devextreme-react";
import {
  Column,
  Editing,
  Lookup,
  RequiredRule,
  Scrolling,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Class, ClassLesson, Lesson } from "../../models";
import { ClassService, ToastService } from "../../services";

interface ClassLessonProps {
  lessonDS: Lesson[];
  classDS: DataSource;
}

export default (props: ClassLessonProps) => {
  const { t } = useTranslation();
  const { lessonDS, classDS } = props;
  const assignedLessonsGrid = useRef(null);
  const [selectedClass, setSelectedClass] = useState<Class>();
  const [assignedLessonList, setAssignedLessonList] = useState<ClassLesson[]>(
    []
  );

  const onSelectedClassChanged = async (e) => {
    setSelectedClass(e.selectedItem);
    if (e.selectedItem) {
      const assignedLessonList = await ClassService.getClassLessons(
        e.selectedItem.id
      );
      setAssignedLessonList(assignedLessonList);
    }
  };

  const assignedLessonsSaved = async (e) => {
    try {
      await ClassService.assignLessonsToClass({
        classId: selectedClass.id,
        lessonIdList: assignedLessonList.map((m) => m.lessonId),
      });
      ToastService.showToast("success", t("messages.sucessful"));
      assignedLessonsGrid?.current?.instance?.refresh();
    } catch (e) {
      ToastService.showToast("error", t("messages.unsucessful"));
    }
  };

  return (
    <React.Fragment>
      <SelectBox
        dataSource={classDS}
        displayExpr={"name"}
        valueExpr={"id"}
        placeholder={t("class-lesson.select-class")}
        onSelectionChanged={onSelectedClassChanged}
        showClearButton={true}
        style={{ marginBottom: "20px", backgroundColor: "red" }}
      />

      {selectedClass ? (
        <DataGrid
          ref={assignedLessonsGrid}
          key={"id"}
          keyExpr={"id"}
          className={"dx-card wide-card"}
          dataSource={assignedLessonList}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          wordWrapEnabled={true}
          allowColumnReordering={true}
          onSaved={assignedLessonsSaved}
        >
          <Scrolling columnRenderingMode={"virtual"} />

          <Editing
            mode={"form"}
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={false}
          ></Editing>

          <Column
            dataField={"id"}
            caption={"id"}
            dataType={"string"}
            visible={false}
            formItem={{ visible: false }}
          />

          <Column
            dataField={"classId"}
            caption={"classId"}
            dataType={"string"}
            visible={false}
            formItem={{ visible: false }}
          />

          <Column
            dataField={"lessonId"}
            caption={t("class-lesson.name")}
            dataType={"string"}
          >
            <Lookup
              dataSource={lessonDS}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>
        </DataGrid>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
