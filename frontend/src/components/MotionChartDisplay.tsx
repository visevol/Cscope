// src/components/GraphDisplay.tsx
import React, { useLayoutEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

import { getModificationTypeFromColor } from "../utils/tooltipHelper"
import { stringToHexColor } from '../utils/stringToHexColor'

interface DataItem {
  title: string;
  x: number;
  y: number;
  color: string;
  filetype: string;
  modificationType: string;
}

const MotionChartDisplay = ( props: any ) => {
  const data = props.fileHistoryCommitData || []
  const dataFormat: DataItem[] = data.map( ( f: any ) => {
    return {
      title: f.fileName,
      x: new Date( f.Date ).getTime(),
      y: f.fileId,
      color: props.showDevs ? stringToHexColor( props.developers.includes( f.author ) ? f.author : "Other" ) : f.typeEvolution,
      filetype: f.filetype,
      author: f.author,
      modificationType: getModificationTypeFromColor( f.typeEvolution )
    }
  } )

  useLayoutEffect( () => {
    const root = am5.Root.new( "chartdiv" )

    root.setThemes( [am5themes_Animated.new( root )] )

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new( root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true
      } )
    )

    // Créer l'axe X en tant que DateAxis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new( root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new( root, {} ),
        tooltip: am5.Tooltip.new( root, {} )
      } )
    )

    xAxis.children.moveValue(
      am5.Label.new( root, {
        text: "Modification Date",
        x: am5.p50,
        centerX: am5.p50
      } ),
      xAxis.children.length - 1
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new( root, {
        renderer: am5xy.AxisRendererY.new( root, {
          inversed: false
        } ),
        tooltip: am5.Tooltip.new( root, {} )
      } )
    )

    yAxis.children.moveValue(
      am5.Label.new( root, {
        rotation: -90,
        text: "File id",
        y: am5.p50,
        centerX: am5.p50
      } ),
      0
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new( root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        seriesTooltipTarget: "bullet", // Affiche le tooltip au niveau du bullet
        tooltip: am5.Tooltip.new( root, {
          pointerOrientation: "horizontal",
          labelText:
            "[bold]{title}[/]\nDate: {valueX.formatDate('yyyy-MM-dd')}\nID: {valueY}\nType of change: {modificationType}\nFile type: {filetype}"
        } )
      } )
    )

    series.strokes.template.set( "visible", false )

    // Add bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    var circleTemplate = am5.Template.new<am5.Circle>( {} )
    circleTemplate.adapters.add( "fill", ( fill, target ) => {
      const dataItem = ( target as any ).dataItem
      if ( dataItem ) {
        return am5.Color.fromString( dataItem.dataContext.color )
      }
      return fill
    } )

    series.bullets.push( function () {
      var bulletCircle = am5.Circle.new(
        root,
        {
          radius: 5,
          fill: series.get( "fill" ),
          fillOpacity: 0.8
        },
        circleTemplate
      )
      return am5.Bullet.new( root, {
        sprite: bulletCircle
      } )
    } )

    // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set( "heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 60,
        dataField: "value",
        key: "radius"
      }
    ] )

    series.data.setAll( dataFormat )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      "cursor",
      am5xy.XYCursor.new( root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series]
      } )
    )

    // Add scrollbars
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new( root, {
        orientation: "horizontal"
      } )
    )

    chart.set(
      "scrollbarY",
      am5.Scrollbar.new( root, {
        orientation: "vertical"
      } )
    )

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear( 1000 )

    chart.appear( 1000, 100 )

    return () => root.dispose()
  }, [data] )

  return <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>
}

export default MotionChartDisplay
