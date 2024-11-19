import React, { useEffect } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import { useTranslation } from "react-i18next";

const ProtectedAreas = () => {
  const { t } = useTranslation();

  return (
    <div>
      <DrawerMenu />
      <div>{t("protectedAreas")}</div>
    </div>
  );
};

export default ProtectedAreas;
