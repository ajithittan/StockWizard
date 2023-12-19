import { useState,useEffect,forwardRef } from "react"
import * as d3 from "d3";

const ChartSize = (props,ref) => {

  const margin = {top: 20, right: 5, bottom: 0, left: 20}

    useEffect(() => {
      if (props.wh_props){
          const setDimensions = (width,height) => {
            const svgElement = d3.select(ref.current)
            let obj={}
            obj.width=props.wh_props.w
            obj.height=props.wh_props.h
            if (props.wh_props.w < 600){
              //Compact
              obj.type="C"
            }else{
              //Normal
              obj.type="N"
            }
            obj.domainwidth=width - margin.left - margin.right
            obj.domainheight=height - margin.top - margin.bottom
            svgElement.attr("width",width).attr("height",height)
            props.setchartdims(obj)
        }
        const calcWidth = () =>{
          let width=props.wh_props.w*.85
          let height = 180
          if (props.wh_props.h > 800){
            height = props.wh_props.h*.90
          }
          setDimensions(width,height);
        }
        calcWidth();
        const updateDimensions = () => calcWidth()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
      }
    }, [props.wh_props]);
}
export default forwardRef(ChartSize)