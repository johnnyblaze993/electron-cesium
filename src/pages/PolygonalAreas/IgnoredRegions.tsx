import React from 'react'
import DrawerMenu from "../../components/DrawerMenu"
import { useTranslation } from 'react-i18next'

const IgnoredRegions = () => {
  const { t } = useTranslation()

  return (
    <div>
      <DrawerMenu />
      {/* <div>IgnoredRegions</div> */}
      <div>{t('ignoredRegions')}</div>
    </div>
  )
}

export default IgnoredRegions