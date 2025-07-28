import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ShowSchemes from '../components/ShowSchemes'
import Filter from '../components/Filter'

const SchemePage = () => {

    return (
        <div className='ml-6'>
            <Topbar />
            <Sidebar>
                <ShowSchemes />
                <div className="h-full w-2.5 bg-gray-300" />
                <Filter />
            </Sidebar>
        </div>
    )
}

export default SchemePage
