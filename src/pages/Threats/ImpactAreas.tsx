import React from 'react'
import { useTranslation } from 'react-i18next'

import DrawerMenu from "../../components/DrawerMenu"

const ImpactAreas = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t("impactAreas")}</div>
    </div>
  )
}

export default ImpactAreas