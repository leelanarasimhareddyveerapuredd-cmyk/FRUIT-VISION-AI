import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { 
  CheckCircle, 
  AlertTriangle, 
  ThermometerSun, 
  Clock, 
  Award, 
  Info,
  Droplets,
  Heart
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

  const ripenessColor = 
    data.ripenessStage === 'Ripe' ? 'text-emerald-600' :
    data.ripenessStage === 'Overripe' ? 'text-amber-600' : 'text-lime-600';
    
  const gradeColor = 
    data.qualityGrade === 'A' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
    data.qualityGrade === 'B' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
    'bg-red-100 text-red-800 border-red-200';

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 mb-8 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                Detected
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${gradeColor}`}>
                Grade {data.qualityGrade}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mb-2">{data.fruitType}</h2>
            <p className="text-slate-500 text-lg flex items-center gap-2">
              Recommendation: <span className="font-semibold text-emerald-600">{data.recommendation}</span>
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center min-w-[100px]">
                <div className="text-slate-400 text-xs font-semibold uppercase mb-1">Sugar</div>
                <div className="text-xl font-bold text-slate-800">{data.sugarContentLevel}</div>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center min-w-[100px]">
                <div className="text-slate-400 text-xs font-semibold uppercase mb-1">Shelf Life</div>
                <div className="text-xl font-bold text-slate-800">{data.estimatedShelfLife}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Visual Metrics */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> Quality Metrics
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Fruit"
                    dataKey="A"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Heart className="w-5 h-5 text-rose-500" /> Nutrition
            </h3>
            <ul className="space-y-3">
              {data.nutritionalHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center/Right Column: Ripeness & Defects */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Ripeness Bar */}
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="flex justify-between items-end mb-6">
               <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ThermometerSun className="w-5 h-5 text-orange-500" /> Ripeness Level
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Current stage: <span className={`font-bold ${ripenessColor}`}>{data.ripenessStage}</span></p>
               </div>
               <div className="text-4xl font-black text-slate-800">
                 {data.ripenessPercentage}%
               </div>
            </div>
            
            <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-400 via-yellow-400 to-red-500 transition-all duration-1000 ease-out"
                 style={{ width: `${data.ripenessPercentage}%` }}
               ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
               <span>Unripe</span>
               <span>Ripe</span>
               <span>Overripe</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             {/* Defects Panel */}
             <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> Defects Detected
                </h3>
                {data.defects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.defects.map((defect, i) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium">
                        {defect}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-200 mb-2" />
                    <p className="text-slate-500 text-sm">No visible defects detected.</p>
                  </div>
                )}
             </div>

             {/* Shelf Life Panel */}
             <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-lg shadow-emerald-200 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                  <Clock className="w-5 h-5" /> Shelf Life
                </h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-4xl font-bold">{data.estimatedShelfLife.split(' ')[0]}</span>
                   <span className="text-lg font-medium opacity-80">{data.estimatedShelfLife.split(' ').slice(1).join(' ')}</span>
                </div>
                <p className="text-emerald-100 text-sm mt-4 leading-relaxed">
                  Store in a cool, dry place to maximize freshness.
                </p>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
