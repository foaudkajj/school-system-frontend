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
import {
  GetAllSubUsersResponse,
  Role,
  User,
  UserStatus,
  UserType,
} from "../../models";
import { useNavigation } from "../../contexts/navigation";
import {
  DxStoreService,
  GetService,
  RoleService,
  UserService,
} from "../../services";

const SERVICE_NAME = "USERS";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();

  const { t } = useTranslation();
  const [subUsers, setSubUsers] = useState<GetAllSubUsersResponse[]>([]);
  const [userTypes, setUserTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [userStatuses, setUserStatuses] = useState<
    { id: string; name: string }[]
  >([]);
  const [usersDatasource, setUsersDatasource] = useState<DataSource>();
  const [roles, setRoles] = useState<Role[]>([]);
  const grid = useRef(null);

  useEffect(() => {
    setUserTypes(
      Object.keys(UserType).map((at) => {
        return {
          id: at,
          name: t(`enums.user-type.${at.toLowerCase()}`),
        };
      })
    );

    setUserStatuses(
      Object.keys(UserStatus).map((at) => {
        return {
          id: at,
          name: t(`enums.user-status.${at.toLowerCase()}`),
        };
      })
    );

    Promise.all([UserService.getAllSubUsers(), RoleService.getAll()]).then(
      (results) => {
        setSubUsers(results[0]);
        setRoles(results[1]);
      }
    );

    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }

    setUsersDatasource(
      DxStoreService.getStore({
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
        remove: (key) => {
          return (
            GetService.get(SERVICE_NAME)?.remove(key) ??
            Promise.resolve(undefined)
          );
        },
        onInserted: (values, key) => grid?.current?.instance?.refresh(),
        onRemoved: (key) => grid?.current?.instance?.refresh(),
      })
    );
  }, [currentPath, setNavigationData, t]);

  const userTypeSetCellValue = function (rowData: User, value: any) {
    rowData.rowId = null;
    this.defaultSetCellValue(rowData, value);
  };

  const getSubUserDatasource = (options) => {
    return {
      store: subUsers,
      filter: options.data ? ["type", "=", options.data.type] : null,
    };
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("users.title")}</h2>
      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          ref={grid}
          dataSource={usersDatasource}
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
            dataField={"type"}
            caption={t("users.user-type")}
            dataType={"string"}
            setCellValue={userTypeSetCellValue}
          >
            <Lookup
              dataSource={userTypes}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"rowId"}
            caption={t("users.sub-user")}
            dataType={"string"}
          >
            <Lookup
              dataSource={getSubUserDatasource}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"username"}
            caption={t("users.username")}
            dataType={"string"}
          >
            <RequiredRule />
          </Column>

          <Column
            dataField={"password"}
            caption={t("users.password")}
            dataType={"string"}
            visible={false}
          >
            <RequiredRule />
          </Column>

          <Column
            dataField={"status"}
            caption={t("users.user-status")}
            dataType={"string"}
          >
            <Lookup
              dataSource={userStatuses}
              displayExpr={"name"}
              valueExpr={"id"}
            />
            <RequiredRule />
          </Column>

          <Column
            dataField={"roleId"}
            caption={t("users.role")}
            dataType={"string"}
          >
            <Lookup dataSource={roles} displayExpr={"name"} valueExpr={"id"} />
            <RequiredRule />
          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
