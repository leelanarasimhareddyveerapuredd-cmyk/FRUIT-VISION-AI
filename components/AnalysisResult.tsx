import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
} from 'recharts';
import { 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Award, 
  Zap,
  Leaf,
  Droplets,
  ThermometerSun
} from 'lucide-react';
import { FruitAnalysis } from '../types';

interface AnalysisResultProps {
  data: FruitAnalysis;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const radarData = [
    { subject: 'Color', A: data.colorScore, fullMark: 100 },
    { subject: 'Texture', A: data.textureScore, fullMark: 100 },
    { subject: 'Shape', A: data.shapeScore, fullMark: 100 },
    { subject: 'Ripeness', A: data.ripenessPercentage, fullMark: 100 },
  ];

  // Dynamic colors based on grade
  const isHighQuality = data.qualityGrade === 'A';
  const isMediumQuality = data.qualityGrade === 'B';
  
  const gradeColorClass = isHighQuality 
    ? 'from-emerald-500 via-emerald-400 to-teal-400 shadow-emerald-200/50' 
    : isMediumQuality 
      ? 'from-amber-400 via-orange-400 to-yellow-500 shadow-amber-200/50' 
      : 'from-rose-500 via-red-500 to-pink-600 shadow-red-200/50';

  const ripenessColor = 
    data.ripenessStage === 'Ripe' ? 'text-emerald-600' :
    data.ripenessStage === 'Overripe' ? 'text-amber-600' : 'text-lime-600';

  if (data.fruitType === "Non-Fruit Object") {
      return (
          <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-red-100 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
                  <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-50">
                      <AlertOctagon className="w-12 h-12 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Detection Failed</h2>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">{data.recommendation}</p>
              </div>
          </div>
      )
  }

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      
      {/* Header Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Grade Card */}
        <div className={`col-span-1 lg:col-span-2 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl bg-gradient-to-br ${gradeColorClass} relative overflow-hidden group`}>
           <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
           <div className="absolute bottom-0 left-0 w-56 h-56 bg-black opacity-5 rounded-full -ml-10 -mb-10 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                      <Award className="w-3 h-3" /> AI Analysis
                    </span>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-7xl font-black tracking-tighter mb-2 drop-shadow-sm">{data.qualityGrade}</h2>
                        <span className="text-2xl font-bold opacity-80">Grade</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <h3 className="text-4xl font-bold tracking-tight">{data.fruitType}</h3>
                    <div className="inline-block mt-2 px-4 py-1.5 bg-black/10 backdrop-blur-sm rounded-xl font-medium text-white/90 border border-white/10">
                        {data.ripenessStage}
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xl font-medium leading-relaxed opacity-95">
                       "{data.recommendation}"
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="col-span-1 grid grid-cols-1 gap-6">
            <div className="glass-card rounded-[2rem] p-6 shadow-xl shadow-emerald-100/50 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300">
                <div className="w-14 h-14 bg-emerald-100/80 rounded-2xl flex items-center justify-center mb-4 text-emerald-600 shadow-inner">
                    <Droplets className="w-7 h-7" />
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Sugar Content</div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">{data.sugarContentLevel}</div>
            </div>
            <div className="glass-card rounded-[2rem] p-6 shadow-xl shadow-blue-100/50 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-100/80 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-inner">
                    <Clock className="w-7 h-7" />
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Shelf Life</div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">{data.estimatedShelfLife}</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Visual Metrics Radar */}
        <div className="md:col-span-5 glass-card rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-100 rounded-xl">
                <ThermometerSun className="w-6 h-6 text-purple-600" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">Visual Grade</h3>
                <p className="text-xs text-slate-400 font-medium">Detailed Score Breakdown</p>
            </div>
          </div>
          <div className="h-[320px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Fruit"
                  dataKey="A"
                  stroke={isHighQuality ? "#10b981" : isMediumQuality ? "#f59e0b" : "#ef4444"}
                  strokeWidth={3}
                  fill={isHighQuality ? "#10b981" : isMediumQuality ? "#f59e0b" : "#ef4444"}
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="md:col-span-7 space-y-6">
            {/* Ripeness Bar */}
            <div className="glass-card rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                <div className="flex justify-between items-end mb-5">
                    <div>
                        <h4 className="text-slate-500 font-semibold mb-1 text-sm uppercase tracking-wide">Maturation Level</h4>
                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-black text-slate-800">{data.ripenessPercentage}<span className="text-2xl text-slate-400">%</span></span>
                        </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl font-bold text-sm border ${ripenessColor} bg-white/50 backdrop-blur-sm shadow-sm`}>
                        {data.ripenessStage} State
                    </span>
                </div>
                
                <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-slate-100/50 z-10"></div>
                    {/* Background gradient for the track */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-lime-300 via-yellow-300 to-red-400"></div>
                    
                    {/* The actual progress bar */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-500 via-yellow-400 to-red-500 rounded-full shadow-lg transition-all duration-1000 ease-out z-20"
                        style={{ width: `${data.ripenessPercentage}%` }}
                    >
                        <div className="absolute top-0 right-0 h-full w-1 bg-white/50"></div>
                    </div>
                </div>
                
                <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                    <span>Unripe</span>
                    <span>Ideal</span>
                    <span>Overripe</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Defects */}
                 <div className="glass-card rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <AlertOctagon className="w-5 h-5 text-amber-500" /> 
                       Defects Found
                    </h3>
                    <div className="min-h-[100px]">
                    {data.defects.length > 0 ? (
                        <ul className="space-y-3">
                            {data.defects.map((defect, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium bg-red-50/50 p-2.5 rounded-xl border border-red-100/50">
                                    <span className="w-2 h-2 mt-1.5 rounded-full bg-red-400 flex-shrink-0 animate-pulse" />
                                    {defect}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-2 text-emerald-600 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                            <CheckCircle2 className="w-8 h-8 mb-2 opacity-80" />
                            <span className="text-sm font-bold">No Defects Detected</span>
                        </div>
                    )}
                    </div>
                 </div>

                 {/* Nutrition */}
                 <div className="glass-card rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <Zap className="w-5 h-5 text-orange-500" /> 
                       Nutritional Value
                    </h3>
                    <ul className="space-y-3">
                        {data.nutritionalHighlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50 transition-colors hover:bg-orange-100/50">
                                <Leaf className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};