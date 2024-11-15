import React from 'react'
import DrawerMenu from "../../components/DrawerMenu"
import { useTranslation } from 'react-i18next'

const AllowableAreas = () => {
  const { t } = useTranslation()

  return (
    <div>
      <DrawerMenu />
    {/* <div>AllowableAreas</div> */}
    <div>{t('allowableAreas')}</div>
    </div>
  )
}

export default AllowableAreas