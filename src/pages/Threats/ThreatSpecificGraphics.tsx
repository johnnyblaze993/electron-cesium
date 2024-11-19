import React from 'react'
import { useTranslation } from 'react-i18next'

import DrawerMenu from "../../components/DrawerMenu"

const ThreatSpecificGraphics = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t('threatSpecificGraphics')}</div>
    </div>
  )
}

export default ThreatSpecificGraphics