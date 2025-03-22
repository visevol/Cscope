import React, { useEffect, useState } from "react"
import { useDataSettingContext } from "../context/DataSettingContext"
import "../assets/styles/evolutionFileCommit.scss"
import DateAndFileInput from "../components/DateAndFileInput"
import MotionChartDisplay from "../components/MotionChartDisplay"
import { FileHistoryCommit } from "../models/FileHistoryCommit"

import { fileHistoryByDate, getFileTypes } from "../api"
import { Spin } from "antd"
import FileTypeChangeFilter from "../components/FileTypeChangeFilter"
import KeywordFilter from "../components/KeywordFilter"
import { useParams } from "react-router-dom"
import { evolutionTypeToCategory, typeEvolutionOptions } from "../utils/tooltipHelper"
import DeveloperColorList from '../components/DevelopersColorList'

const HistoryFileCommitPage: React.FC = () => {
  const [data, setData] = useState<FileHistoryCommit[]>( [] )
  const [pathFilterData, setPathFilterData] = useState<any[]>( [] )
  const [filterData, setFilterData] = useState<FileHistoryCommit[]>( [] )
  const [ready, setReady] = useState<boolean>( false )
  const {
    repository,
    repositoryId,
    setRepositoryId,
    startDate,
    endDate,
    filePath
  } = useDataSettingContext()
  const [typeFiles, setTypeFiles] = useState<string[]>( [] )
  const [selectfilterTypeFiles, setSelectFilterTypeFiles] = useState<string[]>(
    []
  )
  const [checkTypeEvolution, setCheckTypeEvolution] =
    useState<string[]>( typeEvolutionOptions )
  const { id } = useParams<{ id: string }>()

  const [keywordFilter, setKeywordFilter] = useState<string>( "" )

  //Devs in the scope of the chart (filtered)
  const [developers, setDevelopers] = useState<string[]>( [] )

  useEffect( () => {
    const fetchFilesTypes = async () => {
      if ( repository ) {
        const fileTypes = await getFileTypes( repository.id )
        setTypeFiles( fileTypes )
      }
    }

    fetchFilesTypes()
  }, [repository] )

  useEffect( () => {
    if ( !repositoryId ) {
      setRepositoryId( Number( id ) )
    }
  }, [id] )

  useEffect( () => {
    async function fetchData () {
      if ( repository ) {
        const result = await fileHistoryByDate(
          Number( repository.id ),
          startDate,
          endDate
        )
        setData( result )
        updateDevelopers()
        setReady( true )
      }
    }

    setReady( false )
    fetchData()
  }, [repository, startDate, endDate] )

  useEffect( () => {
    const newPathFilterData = data.filter( ( item: FileHistoryCommit ) => {
      return filePath === "" || item.fileName === filePath
    } )

    const setExtTypeFilterData = newPathFilterData.map(
      ( item: FileHistoryCommit ) => {
        return { ...item }
      }
    )

    setPathFilterData( setExtTypeFilterData )
  }, [data, filePath] )

  useEffect( () => {
    const newFilterPathData = pathFilterData.filter( ( item: any ) => {
      return selectfilterTypeFiles.length > 0
        ? selectfilterTypeFiles.includes( item.filetype )
        : true
    } )

    const newFilterData = newFilterPathData.filter( ( item: any ) => {
      const type = evolutionTypeToCategory.get( item.typeEvolution )
      return type && checkTypeEvolution.includes( type )
    } )

    const filteredByKeyword = newFilterData.filter( ( item: any ) => {
      const directoryPath = item.fileName.substring( 0, item.fileName.lastIndexOf( '/' ) )
      return directoryPath.toLowerCase().includes( keywordFilter.toLowerCase() )
    } )
    setReady( false )
    setFilterData( filteredByKeyword )
  }, [pathFilterData, selectfilterTypeFiles, checkTypeEvolution, keywordFilter] )

  useEffect( () => {
    updateDevelopers()
    setReady( true )
  }, [filterData] )

  function updateDevelopers () {
    let newDevs: string[] = []
    filterData.forEach( ( dataUnit, index ) => {
      newDevs.push( dataUnit.author )
    } )

    const devCount: { [ key: string ]: number } = {}
    newDevs.forEach( dev => {
      devCount[ dev ] = ( devCount[ dev ] || 0 ) + 1
    } )

    const devCountArray = Object.entries( devCount )
    const sortedDevs = devCountArray.sort( ( a, b ) => b[ 1 ] - a[ 1 ] )

    const numberOfTopDevs: number = 10
    const topDevs = sortedDevs.slice( 0, numberOfTopDevs )
    const others = sortedDevs.slice( numberOfTopDevs ) // Remaining developers

    // If there are any others, add them as a single "other" category
    if ( others.length > 0 ) {
      const otherCount = others.reduce( ( acc, dev ) => acc + dev[ 1 ], 0 )
      topDevs.push( ["Other", otherCount] )
    }
    const finalDevs = topDevs.map( ( [dev, count] ) => ( dev === "Other" ? `${dev}` : dev ) )
    setDevelopers( finalDevs )
  }

  return (
    <div className="container">
      <div className="row g-4">
        <div className="page col-12 col-lg-8">
          {ready ? (
            <MotionChartDisplay fileHistoryCommitData={filterData} developers={developers} showDevs={false} />
          ) : (
            <Spin size="large" />
          )}
        </div>
        <div className="col-12 col-lg-4">
          <KeywordFilter
            value={keywordFilter}
            onChange={setKeywordFilter} />

          <DateAndFileInput />
          <FileTypeChangeFilter
            fileTypes={typeFiles}
            filterTypeFiles={selectfilterTypeFiles}
            setFilterTypeFiles={setSelectFilterTypeFiles}
            checkedList={checkTypeEvolution}
            setCheckedList={setCheckTypeEvolution}
          />
        </div>
      </div>
    </div>
  )
}

export default HistoryFileCommitPage
