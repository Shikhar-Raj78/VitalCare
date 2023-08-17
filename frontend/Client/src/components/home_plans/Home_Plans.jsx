import React from 'react'
import { Cards } from '../home_card/Cards.jsx'
import { plan_arr } from '../../pages/plans/plan_arr.js'

export const Home_Plans = () => {
  return (
    <div className='grid gap-6 md:grid-cols-2 sm:grid-cols-1 p-5 ml-20 mr-20'>
      {plan_arr.map((plan) => {
        return (
          <Cards key={plan.title} img={plan.img} title={plan.title} overview={plan.overview} />
        )
      })}
    </div>
  )
}
