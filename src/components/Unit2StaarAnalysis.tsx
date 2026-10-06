import React, { useState } from 'react';
import {
  ShieldAlert,
  Info,
  BarChart3,
  CheckCircle2,
  Filter,
  Search,
  Layers,
  BookOpen,
  FileSpreadsheet,
} from 'lucide-react';
import {
  UNIT_2_STAAR_HISTORICAL_SUMMARY,
  UNIT_2_STAAR_REFERENCE_DATA,
  Unit2MatchLevel,
  Unit2SkillCategory,
} from '../data/staar/unit2StaarReferenceData';

export const Unit2StaarAnalysis: React.FC = () => {
  const [selectedRelationshipType, setSelectedRelationshipType] = useState<
    'all' | 'Proportional' | 'Non-Proportional'
  >('all');
  const [selectedRepresentation, setSelectedRepresentation] = useState<
    'all' | 'Graph' | 'Table' | 'Equation' | 'Word Problem' | 'Multiple Representation'
  >('all');
  const [selectedMatchLevel, setSelectedMatchLevel] = useState<'all' | Unit2MatchLevel>('all');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | Unit2SkillCategory>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = UNIT_2_STAAR_REFERENCE_DATA.filter((item) => {
    if (selectedRelationshipType !== 'all' && item.relationshipType !== selectedRelationshipType)
      return false;
    if (
      selectedRepresentation !== 'all' &&
      item.representationCategory !== selectedRepresentation
    )
      return false;
    if (selectedMatchLevel !== 'all' && item.matchLevel !== selectedMatchLevel) return false;
    if (selectedSkillCategory !== 'all' && item.skillCategory !== selectedSkillCategory)
      return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        String(item.questionNumber).includes(q) ||
        item.questionId.toLowerCase().includes(q) ||
        item.teks.toLowerCase().includes(q) ||
        item.relationshipType.toLowerCase().includes(q) ||
        item.representationCategory.toLowerCase().includes(q) ||
        item.questionSkill.toLowerCase().includes(q) ||
        item.comparableReleasedStaar.toLowerCase().includes(q) ||
        item.whyItIsComparable.toLowerCase().includes(q) ||
        item.mathLabAdaptation.toLowerCase().includes(q) ||
        item.skillCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getMatchBadgeClasses = (level: Unit2MatchLevel): string => {
    switch (level) {
      case 'STRONG MATCH':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'MODERATE MATCH':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'TEKS HISTORY':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'NO DIRECT MATCH IDENTIFIED':
        return 'bg-slate-200 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* PROMINENT MANDATORY DISCLAIMERS */}
      <div className="bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-2.5 text-xs sm:text-sm text-amber-950">
            <div className="font-black uppercase tracking-wider text-amber-900 text-xs">
              Important Teacher Reference & Alignment Notice
            </div>
            <p className="font-semibold leading-relaxed">
              {UNIT_2_STAAR_HISTORICAL_SUMMARY.disclaimers.primaryDisclaimer}
            </p>
            <div className="p-3 rounded-xl bg-white/80 border border-amber-200 font-bold text-amber-950">
              {UNIT_2_STAAR_HISTORICAL_SUMMARY.disclaimers.classificationDisclaimer}
            </div>
            <p className="text-xs font-medium text-amber-900 leading-relaxed flex items-start gap-1.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{UNIT_2_STAAR_HISTORICAL_SUMMARY.disclaimers.frequencyDisclaimer}</span>
            </p>
          </div>
        </div>
      </div>

      {/* COMPACT UNIT 2 STAAR HISTORICAL ANALYSIS SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-extrabold text-xs uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" /> Teacher Curriculum Alignment Reference
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {UNIT_2_STAAR_HISTORICAL_SUMMARY.unitTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {UNIT_2_STAAR_HISTORICAL_SUMMARY.unitSubtitle}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-teal-50 border border-teal-200 text-right shrink-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-800">
              Released Administrations Framework
            </div>
            <div className="text-xs sm:text-sm font-black text-teal-950">
              2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026
            </div>
          </div>
        </div>

        {/* Unit 2 TEKS Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNIT_2_STAAR_HISTORICAL_SUMMARY.teksBreakdown.map((t) => (
            <div
              key={t.code}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-indigo-950 font-mono bg-indigo-100 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    {t.code}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      t.standardType === 'Readiness'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {t.standardType} Standard • RC 2
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {t.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-start gap-1.5 text-[11px] font-bold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{t.frequencySummary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Major Unit 2 Skill Categories */}
        <div className="space-y-2.5 pt-1">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>
              Unit 2 Proportional & Non-Proportional Skill Categories Represented in Bank
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {UNIT_2_STAAR_HISTORICAL_SUMMARY.skillCategories.map((cat) => (
              <div
                key={cat.name}
                className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-slate-900">{cat.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{cat.description}</p>
                </div>
                <div className="pt-1.5 border-t border-slate-200/70 flex items-center gap-1 text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                  <BookOpen className="w-3 h-3" />
                  <span>Unit 2 Proportional & Non-Proportional</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR & 36-QUESTION REFERENCE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-teal-700" />
                <span>Unit 2 STAAR Practice Question Bank Reference Table (Q1–Q36)</span>
              </h3>
              <p className="text-xs text-slate-600">
                Showing {filteredItems.length} of {UNIT_2_STAAR_REFERENCE_DATA.length} original Math
                Lab STAAR Practice questions
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by TEKS, skill, question #, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-slate-600">Relationship Type:</span>
              {(['all', 'Proportional', 'Non-Proportional'] as const).map((rel) => (
                <button
                  key={rel}
                  onClick={() => setSelectedRelationshipType(rel)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedRelationshipType === rel
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rel === 'all' ? 'All (36)' : `${rel} (18)`}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-600">Representation:</span>
              {(
                [
                  'all',
                  'Graph',
                  'Table',
                  'Equation',
                  'Word Problem',
                  'Multiple Representation',
                ] as const
              ).map((rep) => (
                <button
                  key={rep}
                  onClick={() => setSelectedRepresentation(rep)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedRepresentation === rep
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rep === 'all' ? 'All Representations' : rep}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-600">Match Level:</span>
              {(
                [
                  'all',
                  'STRONG MATCH',
                  'MODERATE MATCH',
                  'TEKS HISTORY',
                  'NO DIRECT MATCH IDENTIFIED',
                ] as const
              ).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedMatchLevel(level)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedMatchLevel === level
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-600">Skill Category:</span>
              {(
                [
                  'all',
                  'Unit Rate & Constant of Proportionality (y = kx)',
                  'Proportional vs. Non-Proportional Graphs',
                  'Proportional vs. Non-Proportional Tables',
                  'Proportional vs. Non-Proportional Equations',
                  'Slope & Non-Zero y-Intercept (y = mx + b)',
                  'Direct Variation Problem Solving',
                  'Similar Right Triangles & Slope Foundation',
                  'Real-World Verbal Scenarios & Comparisons',
                  'Multiple Representations Synthesis',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedSkillCategory === cat
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Horizontal-Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800 uppercase tracking-wider text-[11px] font-black">
                <th className="py-3 px-3 sticky left-0 bg-slate-900 z-10 whitespace-nowrap">
                  Question
                </th>
                <th className="py-3 px-3 whitespace-nowrap">TEKS</th>
                <th className="py-3 px-3 min-w-[190px]">Question Skill</th>
                <th className="py-3 px-3 min-w-[130px]">Item Format</th>
                <th className="py-3 px-3 min-w-[200px]">Comparable Released STAAR</th>
                <th className="py-3 px-3 whitespace-nowrap">Match Level</th>
                <th className="py-3 px-3 min-w-[240px]">Why It Is Comparable</th>
                <th className="py-3 px-3 min-w-[240px]">Math Lab Adaptation</th>
                <th className="py-3 px-3 min-w-[180px]">TEKS Frequency</th>
                <th className="py-3 px-3 min-w-[190px]">Question Skill Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.map((row) => (
                <tr
                  key={row.questionId}
                  className="hover:bg-teal-50/40 transition-colors align-top bg-white"
                >
                  <td className="py-3.5 px-3 font-black text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#0F766E] text-white text-xs font-black">
                          Q{row.questionNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {row.questionId}
                        </span>
                      </div>
                      <span
                        className={`inline-block w-fit px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          row.relationshipType === 'Proportional'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                        }`}
                      >
                        {row.relationshipType} • {row.representationCategory}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-teal-800 whitespace-nowrap">
                    {row.teks}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 leading-snug">{row.questionSkill}</div>
                    <div className="text-[11px] font-semibold text-teal-700 mt-0.5">
                      {row.skillCategory}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700 leading-snug">
                    {row.itemFormat}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 leading-snug">
                    {row.comparableReleasedStaar}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getMatchBadgeClasses(
                        row.matchLevel
                      )}`}
                    >
                      {row.matchLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 leading-relaxed">
                    {row.whyItIsComparable}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 leading-relaxed">
                    {row.mathLabAdaptation}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium leading-snug">
                    {row.teksFrequency}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 leading-snug">
                    {row.questionSkillFrequency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
