import { useEffect, useState } from "react";
import {
  Search,
  Brain,
  ShieldAlert,
  CheckCircle,
  Activity,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { investigateLog } from "../services/investigationService";
import { getIOCs } from "../services/iocService";
import { getMitre } from "../services/mitreService";
import { getTimeline } from "../services/timelineService";
import { getLogs } from "../services/logService";

import ThreatCharts from "../components/dashboard/ThreatCharts";


export default function LogViewer() {

  const { filename } = useParams();
  const navigate = useNavigate();


  // =========================
  // STATES
  // =========================

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [result, setResult] = useState(null);

  const [investigation, setInvestigation] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);

  const [loadingStep, setLoadingStep] = useState(0);


  const [ioc, setIoc] = useState(null);

  const [mitre, setMitre] = useState([]);

  const [timeline, setTimeline] = useState([]);


  // VIRA NEW STATES

  const [riskScore, setRiskScore] = useState(0);

  const [status, setStatus] = useState("Ready");

  const [recommendations, setRecommendations] = useState([]);





  // =========================
  // LOAD LOG DATA
  // =========================


  useEffect(() => {

    if(filename){
      loadLogs();
    }

  },[filename]);




  async function loadLogs(){

    try{

      const data = await getLogs(filename);

      setLogs(data);



      const iocData = await getIOCs(filename);

      setIoc(iocData);



    }

    catch(error){

      console.error(
        "Log loading failed",
        error
      );

    }

    finally{

      setLoading(false);

    }

  }





  // =========================
  // LOG ANALYSIS CALCULATIONS
  // =========================


  const filteredLogs = logs.filter((row)=>

    Object.values(row).some((value)=>

      String(value)
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    )

  );



  const totalLogs =
    filteredLogs.length;



  const uniqueIPs =
    new Set(
      filteredLogs.map(
        log=>log.source_ip
      )
    ).size;



  const failedLogins =
    filteredLogs.filter(log=>

      String(log.event)
      .toLowerCase()
      .includes("failed")

    ).length;



  const malwareEvents =
    filteredLogs.filter(log=>

      String(log.event)
      .toLowerCase()
      .includes("malware")

    ).length;





  const severityData = [

    {
      name:"High",
      value:malwareEvents
    },

    {
      name:"Medium",
      value:failedLogins
    },

    {
      name:"Low",
      value:
      Math.max(
        totalLogs -
        malwareEvents -
        failedLogins,
        0
      )
    }

  ];





  function getSeverity(event){


    const e =
    String(event)
    .toLowerCase();



    if(
      e.includes("malware")
    )
    {
      return "High";
    }


    if(
      e.includes("failed")
    )
    {
      return "Medium";
    }


    return "Low";

  }





  // =========================
  // VIRA AI INVESTIGATION
  // =========================


  async function runInvestigation(){


    try{


      setAiLoading(true);

      setStatus("Analyzing");



      const steps=[
        1,2,3,4,5
      ];



      for(
        const step of steps
      ){

        setLoadingStep(step);


        await new Promise(
          resolve =>
          setTimeout(
            resolve,
            900
          )
        );

      }




      const data =
      await investigateLog(
        filename
      );


      setResult(data);




      const mapping =
      await getMitre(
        filename
      );


      setMitre(mapping);




      const timelineData =
      await getTimeline(
        filename
      );


      setTimeline(
        timelineData
      );





      const score =
      Math.min(

        (malwareEvents * 20)
        +
        (failedLogins * 5),

        100

      );



      setRiskScore(score);





      setRecommendations([

        "Block malicious IP addresses",

        "Review authentication failures",

        "Perform endpoint malware scanning",

        "Monitor suspicious network activity"

      ]);



      setStatus("Completed");

      setInvestigation(true);



    }


    catch(error){


      console.error(
        "VIRA Investigation Error",
        error
      );


      setStatus("Failed");


    }


    finally{


      setAiLoading(false);

      setLoadingStep(0);


    }


  }






  if(loading){

    return(

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      text-white
      text-xl
      ">

        Loading Logs...

      </div>

    );

  }
  
return (

<div className="
min-h-screen
bg-slate-950
p-8
text-white
">


{/* =========================
HEADER
========================= */}


<div className="mb-8">


<h1 className="
text-4xl
font-bold
">

Log Viewer

</h1>



<p className="
mt-2
text-slate-400
">

Viewing:
<span className="text-cyan-400 ml-2">
{filename}
</span>

</p>




<input

type="text"

placeholder="Search logs..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="
mt-5
w-full
rounded-xl
border
border-slate-700
bg-slate-900
p-3
text-white
outline-none
focus:border-cyan-500
"

/>


</div>





{/* =========================
LOG STATISTICS
========================= */}


<div className="
mb-8
grid
grid-cols-1
gap-6
md:grid-cols-2
xl:grid-cols-4
">



<div className="
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
">

<p className="text-slate-400">
Total Logs
</p>


<h2 className="
mt-2
text-3xl
font-bold
">

{totalLogs}

</h2>


</div>





<div className="
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
">

<p className="text-slate-400">
Unique IPs
</p>


<h2 className="
mt-2
text-3xl
font-bold
">

{uniqueIPs}

</h2>


</div>





<div className="
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
">


<p className="text-slate-400">
Failed Logins
</p>


<h2 className="
mt-2
text-3xl
font-bold
text-yellow-400
">

{failedLogins}

</h2>


</div>





<div className="
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
">


<p className="text-slate-400">
Malware Events
</p>


<h2 className="
mt-2
text-3xl
font-bold
text-red-400
">

{malwareEvents}

</h2>


</div>



</div>






{/* =========================
IOC SECTION
========================= */}



{
ioc && (


<div className="
mb-8
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
">


<h2 className="
mb-6
text-2xl
font-bold
text-cyan-400
">

Indicators of Compromise (IOC)

</h2>





<div className="
grid
grid-cols-1
gap-6
md:grid-cols-2
">





<div>

<h3 className="
font-semibold
text-red-400
mb-2
">

🌐 IP Addresses

</h3>


{

ioc.ips.length ?


<ul className="list-disc pl-6">

{
ioc.ips.map(
(ip,index)=>(

<li key={index}>
{ip}
</li>

)

)

}

</ul>


:

<p className="text-slate-400">
None
</p>

}



</div>






<div>

<h3 className="
font-semibold
text-yellow-400
mb-2
">

🌍 Domains

</h3>


{

ioc.domains.length ?


<ul className="list-disc pl-6">

{

ioc.domains.map(
(domain,index)=>(

<li key={index}>
{domain}
</li>

)

)

}


</ul>


:

<p className="text-slate-400">
None
</p>


}


</div>







<div>

<h3 className="
font-semibold
text-green-400
mb-2
">

🔗 URLs

</h3>


{

ioc.urls.length ?


<ul className="list-disc pl-6">


{

ioc.urls.map(
(url,index)=>(

<li key={index}>
{url}
</li>

)

)

}


</ul>


:

<p className="text-slate-400">
None
</p>


}



</div>







<div>

<h3 className="
font-semibold
text-blue-400
mb-2
">

📧 Emails

</h3>



{

ioc.emails.length ?


<ul className="list-disc pl-6">


{

ioc.emails.map(
(email,index)=>(

<li key={index}>
{email}
</li>

)

)

}


</ul>


:

<p className="text-slate-400">
None
</p>


}



</div>





</div>



</div>


)

}







{/* =========================
VIRA CONTROL PANEL
========================= */}



<div className="
mb-8
rounded-2xl
border
border-cyan-500/30
bg-slate-900
p-6
flex
items-center
justify-between
">





<div>


<h2 className="
flex
items-center
gap-3
text-2xl
font-bold
">


<Brain className="text-cyan-400"/>


VIRA AI Investigation


</h2>



<p className="
mt-2
text-slate-400
">

Autonomous threat analysis and incident response

</p>


</div>





<div className="text-right">



<span className="
rounded-full
bg-cyan-500/20
px-4
py-2
text-cyan-400
">

{status}

</span>




<button

onClick={runInvestigation}

disabled={aiLoading}

className="
mt-4
flex
items-center
gap-2
rounded-xl
bg-cyan-600
px-6
py-3
font-semibold
hover:bg-cyan-500
disabled:bg-slate-600
"

>


<Search size={18}/>


{

aiLoading

?

"Analyzing..."

:

"Investigate with VIRA"

}


</button>




</div>



</div>








{/* =========================
AI PROCESSING ANIMATION
========================= */}



{
aiLoading && (


<div className="
mb-8
rounded-2xl
border
border-cyan-500/30
bg-slate-900
p-8
">



<div className="
flex
items-center
gap-4
">


<div className="
h-14
w-14
flex
items-center
justify-center
rounded-full
bg-cyan-500/20
text-3xl
animate-pulse
">

🧠

</div>



<div>


<h2 className="
text-2xl
font-bold
text-cyan-400
">

VIRA AI Engine

</h2>


<p className="text-slate-400">

Performing security investigation...

</p>


</div>


</div>






<div className="
mt-8
h-3
rounded-full
bg-slate-800
overflow-hidden
">


<div

className="
h-full
bg-cyan-500
transition-all
duration-700
"

style={{

width:`${loadingStep*20}%`

}}

/>


</div>






<div className="
mt-8
space-y-4
">


{

[

"Parsing uploaded logs",

"Detecting Indicators of Compromise",

"Mapping MITRE ATT&CK techniques",

"Building attack timeline",

"Generating AI investigation report"

]

.map(
(step,index)=>(


<div

key={index}

className={

loadingStep > index

?

"text-cyan-400"

:

"text-slate-500"

}

>


{
loadingStep > index
?
"✔"
:
"○"
}


{" "}

{step}


</div>



)

)



}



</div>


</div>


)

}





{/* =========================
VIRA INVESTIGATION RESULT
========================= */}



{
(investigation || result) && (


<div className="
mb-8
rounded-2xl
border
border-cyan-500/30
bg-slate-900
p-6
">



<h2 className="
text-2xl
font-bold
text-cyan-400
">

VIRA Investigation Report

</h2>




{/* RISK CARDS */}

<div className="
mt-6
grid
grid-cols-1
gap-6
md:grid-cols-3
">



<div className="
rounded-xl
border
border-red-500/30
bg-red-500/10
p-5
">

<ShieldAlert
className="text-red-400"
/>


<p className="
mt-3
text-slate-400
">

Threat Risk Score

</p>


<h3 className="
text-4xl
font-bold
text-red-400
">

{riskScore}%

</h3>


</div>






<div className="
rounded-xl
border
border-cyan-500/30
bg-slate-950
p-5
">


<Activity
className="text-cyan-400"
/>



<p className="
mt-3
text-slate-400
">

MITRE Techniques

</p>


<h3 className="
text-4xl
font-bold
">

{mitre.length}

</h3>


</div>






<div className="
rounded-xl
border
border-green-500/30
bg-slate-950
p-5
">


<CheckCircle
className="text-green-400"
/>



<p className="
mt-3
text-slate-400
">

Investigation Status

</p>


<h3 className="
text-xl
font-bold
text-green-400
">

Completed

</h3>


</div>



</div>








{/* AI SUMMARY */}


{
result && (

<div className="mt-8">


<h3 className="
mb-4
text-xl
font-semibold
text-cyan-400
">

AI Investigation Summary

</h3>



<div className="
rounded-xl
bg-slate-950
p-5
text-slate-300
whitespace-pre-wrap
">


{result.summary}


</div>



</div>

)

}







{/* RECOMMENDATIONS */}


{
recommendations.length > 0 && (


<div className="mt-8">


<h3 className="
text-xl
font-bold
text-cyan-400
">

Recommended Actions

</h3>



<div className="
mt-4
space-y-3
">


{

recommendations.map(

(item,index)=>(


<div

key={index}

className="
rounded-xl
border
border-slate-700
bg-slate-950
p-4
"

>


✔ {item}


</div>


)

)


}


</div>


</div>


)

}







{/* REPORT BUTTON */}



{
result && (

<div className="
mt-8
flex
justify-end
">


<button

onClick={()=>


navigate(
"/report",
{

state:{

report:{

file:filename,

summary:
result.summary,

mitre,

iocs:[

...(ioc?.ips || []),

...(ioc?.domains || []),

...(ioc?.urls || []),

...(ioc?.emails || [])

],

timeline


}

}

}

)

}

className="
rounded-xl
bg-green-600
px-8
py-3
font-semibold
hover:bg-green-500
"

>

📄 Generate Report


</button>



</div>

)

}









{/* MITRE ATT&CK */}



{
mitre.length > 0 && (


<div className="mt-10">


<h3 className="
mb-4
text-2xl
font-bold
text-cyan-400
">

MITRE ATT&CK Mapping

</h3>




<div className="
grid
gap-4
md:grid-cols-2
">


{

mitre.map(

(item,index)=>(


<div

key={index}

className="
rounded-xl
border
border-slate-700
bg-slate-950
p-5
"

>


<p className="
text-lg
font-bold
text-cyan-400
">

{item.id}

</p>



<p className="
mt-2
font-semibold
">

{item.name}

</p>




<p className="
mt-1
text-slate-400
">

{item.tactic}

</p>



</div>


)

)


}


</div>



</div>


)

}








{/* TIMELINE */}



{
timeline.length > 0 && (


<div className="mt-10">


<h3 className="
mb-4
text-2xl
font-bold
text-cyan-400
">

Investigation Timeline

</h3>




<div className="space-y-4">


{

timeline.map(

(item,index)=>(


<div

key={index}

className="
rounded-xl
border
border-slate-700
bg-slate-950
p-5
"

>


<p className="
font-semibold
text-cyan-400
">

{item.time}

</p>



<p className="
mt-2
text-lg
">

{item.event}

</p>



<p className="
mt-1
text-slate-400
">

Source IP:
{item.ip}

</p>



</div>


)

)


}



</div>


</div>


)

}




</div>


)

}









{/* =========================
THREAT CHARTS
========================= */}



<ThreatCharts

severityData={severityData}

/>









{/* =========================
LOG TABLE
========================= */}




<div className="
overflow-x-auto
rounded-xl
border
border-slate-700
mt-8
">


<table className="w-full">



<thead className="bg-slate-800">


<tr>


{

logs.length > 0 &&

Object.keys(logs[0]).map(

(key)=>(


<th

key={key}

className="
border-b
border-slate-700
px-4
py-3
text-left
"

>

{key}

</th>


)

)


}



<th

className="
border-b
border-slate-700
px-4
py-3
text-left
"

>

Severity

</th>


</tr>


</thead>






<tbody>


{

filteredLogs.map(

(row,index)=>(


<tr

key={index}

className="
border-b
border-slate-800
hover:bg-slate-900
"

>


{

Object.values(row).map(

(value,i)=>(


<td

key={i}

className="
px-4
py-3
"

>

{String(value)}

</td>


)

)


}



<td className="px-4 py-3">


<span

className={`

rounded-full
px-3
py-1
text-sm
font-semibold


${
getSeverity(row.event)==="High"

?

"bg-red-500/20 text-red-400"

:

getSeverity(row.event)==="Medium"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}


>


{getSeverity(row.event)}


</span>


</td>



</tr>


)

)


}



</tbody>


</table>


</div>





</div>

);

}