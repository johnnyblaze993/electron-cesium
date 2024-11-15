import React from 'react'
import DrawerMenu from "../../components/DrawerMenu"
import { useTranslation } from 'react-i18next'

const FOBBoundaries = () => {
  const { t } = useTranslation()
  return (
    <div>
      <DrawerMenu />
    {/* <div>FOBBoundaries</div> */}
    <div>{t('fobBoundaries')}</div>
    </div>
  )
}

export default FOBBoundaries