import React from 'react'
import { useTranslation } from 'react-i18next'

import DrawerMenu from "../../components/DrawerMenu"

const FlightProfiles = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
      <div>{t('flightProfiles')}</div>
    </div>
  )
}

export default FlightProfiles