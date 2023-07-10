import React from 'react'
import { plan_arr } from './plan_arr'

export const Plans = () => {
  return (
    <div>
        {plan_arr.map((plan) => {
            return (
                <div key={plan.title}>
                    <h1>{plan.title}</h1>
                    <div>
                        <h2>Overview</h2>
                        <div>
                            {plan.overview}
                        </div>
                    </div>
                    <div>
                        <h2>Key Features</h2>
                        <div>
                            {plan.key_features.map((feature)=>{
                                <p>{feature}</p>
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Target Customers</h2>
                        <div>
                            {plan.target_audience.map((customers)=>{
                                <p>{customers}</p>
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Cost</h2>
                        <div>
                            {plan.cost.map((c)=>{
                                <p>{c}</p>
                            })}
                        </div>
                    </div>
                    <button>
                        Get a quote
                    </button>
                </div>
            )
        })}
    </div>
  )
}
