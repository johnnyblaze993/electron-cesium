import React from 'react'
import DrawerMenu from "../../components/DrawerMenu"
import { useTranslation } from 'react-i18next'

const WeaponSpecificGraphics = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t("weaponSpecificGraphics")}</div>
    </div>
  )
}

export default WeaponSpecificGraphics