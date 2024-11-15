import React from 'react'
import DrawerMenu from "../../components/DrawerMenu"
import { useTranslation } from 'react-i18next'

const NIAs = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t("nias")}</div>
    </div>
  )
}

export default NIAs