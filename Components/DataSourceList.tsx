import React from 'react'
import DataSource from './DataSource'

const DataSourceList = ({imageOnly}: {imageOnly: boolean}) => {
  return (
        <div className="dataSourceList">
            <DataSource  platform={"NASA"} imageOnly={imageOnly}/>
        </div>
  )
}

export default DataSourceList