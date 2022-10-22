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
import DataSource from "devextreme/data/data_source";
import { useNavigation } from "../../contexts/navigation";
import {
  Country,
  EducationType,
  GenericListIds,
  GenericListItem,
} from "../../models";
import {
  CountryService,
  DxStoreService,
  GenericListService,
  GetService,
} from "../../services";
import { translateItems } from "../../globals";

const SERVICE_NAME = "STUDENT";

export default (props: any) => {
  const { currentPath } = props;
  const { t } = useTranslation();
  const { setNavigationData } = useNavigation();
  const [nationalityList, setNationalityList] = useState([]);
  const [documentTypeList, setDocumentTypeList] = useState([]);

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }

    CountryService.getAll().then((res: Country[]) => {
      setNationalityList(res);
    });

    GenericListService.getById(GenericListIds.DocumentType).then((gl) => {
      gl.items = translateItems<GenericListItem>(gl.items, t);
      setDocumentTypeList(gl.items);
    });
  }, [setNavigationData, currentPath, t]);

  const genderList = [
    {
      id: "Male",
      name: t("students.male"),
    },
    {
      id: "Female",
      name: t("students.female"),
    },
  ];

  const educationTypeList = Object.keys(EducationType).map((et) => {
    return {
      id: et,
      name: t(`enums.education-type.${et.toLowerCase()}`),
    };
  });

  const studentsGrid = useRef(null);

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
    onInserted: (values, key) => studentsGrid?.current?.instance?.refresh(),
    onRemoved: (key) => studentsGrid?.current?.instance?.refresh(),
    onUpdated: (values, key) => studentsGrid?.current?.instance?.refresh(),
  });

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("students.title")}</h2>
      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          ref={studentsGrid}
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
            dataField={"name"}
            caption={t("students.name")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
            <RequiredRule />
          </Column>

          <Column
            dataField={"surname"}
            caption={t("students.surname")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
            <RequiredRule />
          </Column>

          <Column
            dataField={"gender"}
            caption={t("students.gender")}
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
            caption={t("students.tr-name")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
            <RequiredRule />
          </Column>

          <Column
            dataField={"trSurname"}
            caption={t("students.tr-surname")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
            <RequiredRule />
          </Column>

          <Column
            dataField={"educationType"}
            caption={t("students.education-type")}
            dataType={"string"}
          >
            <Lookup
              dataSource={educationTypeList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"nationalityId"}
            caption={t("students.nationality-id")}
            dataType={"string"}
          >
            <Lookup
              dataSource={nationalityList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"documentTypeId"}
            caption={t("students.document-type-id")}
            dataType={"string"}
          >
            <Lookup
              dataSource={documentTypeList}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"gsm"}
            caption={t("students.gsm")}
            dataType={"string"}
            editorOptions={{ mask: "(999)999-9999", rtlEnabled: false }}
          ></Column>

          <Column
            dataField={"identityNo"}
            caption={t("students.identity-no")}
            dataType={"string"}
          >
            <StringLengthRule max={20} />
          </Column>

          <Column
            dataField={"address"}
            caption={t("students.address")}
            dataType={"string"}
          >
            <StringLengthRule max={1000} />
          </Column>

          <Column
            dataField={"fatherName"}
            caption={t("students.father-name")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
          </Column>

          <Column
            dataField={"fatherNumber"}
            caption={t("students.father-number")}
            dataType={"string"}
          >
            <StringLengthRule max={20} />
          </Column>

          <Column
            dataField={"motherName"}
            caption={t("students.mother-name")}
            dataType={"string"}
          >
            <StringLengthRule max={50} />
          </Column>

          <Column
            dataField={"motherNumber"}
            caption={t("students.mother-number")}
            dataType={"string"}
          >
            <StringLengthRule max={20} />
          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
