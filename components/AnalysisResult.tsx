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
  Info
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
    ? 'from-emerald-500 to-teal-500 shadow-emerald-200' 
    : isMediumQuality 
      ? 'from-yellow-400 to-amber-500 shadow-amber-200' 
      : 'from-red-500 to-rose-500 shadow-red-200';

  const ripenessColor = 
    data.ripenessStage === 'Ripe' ? 'text-emerald-600' :
    data.ripenessStage === 'Overripe' ? 'text-amber-600' : 'text-lime-600';

  if (data.fruitType === "Non-Fruit Object") {
      return (
          <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-red-100 text-center">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertOctagon className="w-10 h-10 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Could Not Identify Fruit</h2>
                  <p className="text-slate-500">{data.recommendation}</p>
              </div>
          </div>
      )
  }

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      
      {/* Header Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Grade Card */}
        <div className={`col-span-1 lg:col-span-2 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl bg-gradient-to-br ${gradeColorClass} relative overflow-hidden`}>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                      AI Analysis Result
                    </span>
                    <h2 className="text-5xl font-black tracking-tight mb-2">{data.qualityGrade}</h2>
                    <p className="text-lg opacity-90 font-medium">Quality Grade</p>
                 </div>
                 <div className="text-right">
                    <h3 className="text-3xl font-bold">{data.fruitType}</h3>
                    <p className="opacity-80 mt-1">{data.ripenessStage}</p>
                 </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                 <p className="text-xl font-medium leading-relaxed opacity-95">
                   "{data.recommendation}"
                 </p>
              </div>
           </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="col-span-1 grid grid-cols-1 gap-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-3 text-emerald-600">
                    <Leaf className="w-6 h-6" />
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Sugar Level</div>
                <div className="text-2xl font-bold text-slate-800">{data.sugarContentLevel}</div>
            </div>
            <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 text-blue-600">
                    <Clock className="w-6 h-6" />
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Shelf Life</div>
                <div className="text-2xl font-bold text-slate-800">{data.estimatedShelfLife}</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Visual Metrics Radar */}
        <div className="md:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-xl">
                <Award className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Visual Metrics</h3>
          </div>
          <div className="h-[300px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" strokeWidth={2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Fruit"
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="md:col-span-7 space-y-6">
            {/* Ripeness Bar */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h4 className="text-slate-500 font-medium mb-1">Ripeness Meter</h4>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-slate-800">{data.ripenessPercentage}%</span>
                            <span className={`font-bold ${ripenessColor}`}>{data.ripenessStage}</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-400 via-yellow-400 to-red-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                        style={{ width: `${data.ripenessPercentage}%` }}
                    />
                </div>
                <div className="flex justify-between mt-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    <span>Unripe</span>
                    <span>Perfect</span>
                    <span>Overripe</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Defects */}
                 <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <AlertOctagon className="w-5 h-5 text-amber-500" /> Defects
                    </h3>
                    {data.defects.length > 0 ? (
                        <ul className="space-y-2">
                            {data.defects.map((defect, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 flex-shrink-0" />
                                    {defect}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-start gap-2 text-emerald-600">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> None detected
                            </span>
                            <span className="text-xs text-emerald-600/70">Fruit appears visually perfect.</span>
                        </div>
                    )}
                 </div>

                 {/* Nutrition */}
                 <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <Zap className="w-5 h-5 text-orange-500" /> Nutrition
                    </h3>
                    <ul className="space-y-3">
                        {data.nutritionalHighlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                {item}
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