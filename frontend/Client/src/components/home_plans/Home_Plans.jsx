import React from 'react'
import '../home_card/Cards.css'
import {Cards} from '../home_card/Cards.jsx'
import { plan_arr } from '../plans/plan_arr.js'
export const Home_Plans = () => {
  return (
    <div className='grids'>
        {plan_arr.map((plan)=> {
            return(
                <Cards  key = {plan.title} title= {plan.title}  overview = {plan.overview}/>
            )
        })}
    </div>
  )
}
