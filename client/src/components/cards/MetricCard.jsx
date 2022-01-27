import React from 'react'
import './Card.css'

export default function MetricCard({ amount, text, subtext, theme }) {
    // function formatAmount (amount){
    //   const ary = String(amount).split('.');
    //   if(ary[0].length >= 10 &&  ary[0].length < 13){
    //     let trim = ary[0].slice(0, 3);
    //     let resp = '';
    //     let cnt = 0;
    //     for(let chr of trim){
    //       if(cnt === 0){
    //         resp+=`${chr}.`;
    //         cnt++;
    //       }else{
    //         resp+=`${chr}`;
    //       }
    //     }
    //     return`$${resp}B`
    //   }
    // }
    // function convert(n) {
    //     let num = new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD',
    //     }).format((Number(n) / 1000000).toFixed(1))
    //     return `${num.substring(0, num.length - 1)} M`
    //     // if (n < 1e3) return n;
    //     // if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + " K";
    //     // if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + " M";
    //     // if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + " B";
    //     // if (n >= 1e12) return +(n / 1e12).toFixed(2) + " T";
    // }
    return (
        <div className={`mcard ${theme}`}>
            <div className="mcard-amount">{amount}</div>
            <div className="mcard-text">{text}</div>
            <div className="mcard-subtext">{subtext}</div>
        </div>
    )
}
