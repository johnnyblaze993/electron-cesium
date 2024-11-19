import React from 'react'
import { useTranslation } from 'react-i18next'

import DrawerMenu from "../../../components/DrawerMenu"

const PolarGroundCoverage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t('polarGroundCoverage')}</div>
    </div>
  )
}

export default PolarGroundCoverage