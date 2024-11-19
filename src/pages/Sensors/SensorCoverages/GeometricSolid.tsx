import React from 'react'
import { useTranslation } from 'react-i18next'

import DrawerMenu from "../../../components/DrawerMenu"

const GeometricSolid = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t('geometricSolid')}</div>
    </div>
  )
}

export default GeometricSolid