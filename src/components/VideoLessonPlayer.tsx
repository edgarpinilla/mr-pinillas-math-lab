import React, { useState } from 'react';
import { Play, Clock, BookOpen, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';
import { VideoLessonInfo } from '../types';

interface VideoLessonPlayerProps {
  video: VideoLessonInfo;
  topicTitle: string;
}

export const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({ video, topicTitle }) => {
  const [isPlayingPlaceholder, setIsPlayingPlaceholder] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [customEmbedUrl, setCustomEmbedUrl] = useState<string>('');
  const [isEditingEmbed, setIsEditingEmbed] = useState<boolean>(false);

  const hasMultipleLessons = Boolean(video.lessons && video.lessons.length > 0);

  // If this topic has a multi-lesson video library (Topic 1)
  if (hasMultipleLessons && video.lessons) {
    return (
      <div id="video-lesson-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Library Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Play className="w-3 h-3 fill-red-600 text-red-600" /> Video Library
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{video.title}</h3>
            <p className="text-slate-600 text-sm mt-1">{video.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 shrink-0">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {video.instructor}
            </span>
          </div>
        </div>

        {video.description && (
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {video.description}
          </p>
        )}

        {/* 4 Responsive Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {video.lessons.map((lesson) => (
            <div
              key={lesson.id}
              id={`lesson-card-${lesson.id}`}
              className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">{lesson.title}</h4>
                  {lesson.badge && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {lesson.badge}
                    </span>
                  )}
                </div>
                {lesson.subtitle && (
                  <p className="text-xs font-medium text-slate-500">{lesson.subtitle}</p>
                )}
                {lesson.description && (
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">{lesson.description}</p>
                )}
              </div>

              {/* Responsive 16:9 Video Embed Container */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm">
                <iframe
                  src={lesson.youtubeEmbedUrl}
                  title={lesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Open on YouTube Action Button */}
              <div className="pt-1">
                <a
                  id={`open-youtube-${lesson.id}`}
                  href={lesson.youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Preserved Key Lesson Takeaways Section */}
        {video.keyTakeaways && video.keyTakeaways.length > 0 && (
          <div className="bg-indigo-50/60 rounded-2xl p-5 sm:p-6 border border-indigo-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Key Lesson Takeaways
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {video.keyTakeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-indigo-950 leading-relaxed bg-white/70 p-3 rounded-xl border border-indigo-100/60"
                >
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Single-video fallback for other topics (Topic 2)
  const isDirectEmbed = Boolean(video.youtubeEmbedUrl);
  const embedUrl = customEmbedUrl.trim() || video.youtubeEmbedUrl || video.youtubeEmbedUrlPlaceholder || '';
  const watchUrl = video.youtubeWatchUrl || video.youtubeWatchUrlPlaceholder;
  const hasChapters = Boolean(video.chapters && video.chapters.length > 0);

  return (
    <div id="video-lesson-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Play className="w-3 h-3 fill-red-600 text-red-600" /> Video Lesson
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{video.title}</h3>
          <p className="text-slate-600 text-sm mt-1">{video.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
          {video.duration && (
            <>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {video.duration}
              </span>
              <span className="text-slate-300">•</span>
            </>
          )}
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {video.instructor}
          </span>
        </div>
      </div>

      {/* Video Container and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          {/* Responsive 16:9 Video Embed Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md">
            {isDirectEmbed || (customEmbedUrl && customEmbedUrl.includes('http')) ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : isPlayingPlaceholder ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center animate-pulse">
                  <Play className="w-8 h-8 fill-red-500 text-red-500 ml-1" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-900/50 px-2.5 py-1 rounded-full">
                    YouTube Embed Placeholder Active
                  </span>
                  <h4 className="text-lg font-bold text-white mt-2">{video.title}</h4>
                  {hasChapters && video.chapters && (
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Playing preview segment: <span className="text-amber-300 font-semibold">{video.chapters[activeChapter]?.title}</span> ({video.chapters[activeChapter]?.time})
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsPlayingPlaceholder(false)}
                    className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => setIsEditingEmbed(!isEditingEmbed)}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
                  >
                    Configure YouTube URL
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

                <div className="relative z-10 space-y-4 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    YouTube Lesson Embed Placeholder
                  </div>

                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    {topicTitle}: Video Lesson
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      id="play-video-placeholder-btn"
                      onClick={() => setIsPlayingPlaceholder(true)}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-white text-white" />
                      Preview Lesson Video
                    </button>

                    <button
                      onClick={() => setIsEditingEmbed(!isEditingEmbed)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
                    >
                      {isEditingEmbed ? 'Hide Embed Config' : 'Set YouTube Video Link'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description and Open on YouTube button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {video.description}
            </p>

            {watchUrl && (
              <a
                id="open-on-youtube-btn"
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open on YouTube</span>
              </a>
            )}
          </div>

          {/* Embed URL Configuration Panel (for placeholder topics) */}
          {isEditingEmbed && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">YouTube Embed Configuration:</span>
                <span className="text-slate-500">Purely client-side iframe embed</span>
              </div>
              <p className="text-slate-600">
                Paste any standard YouTube Embed link (e.g., <code className="bg-slate-200 px-1 py-0.5 rounded">https://www.youtube.com/embed/VIDEO_ID</code>) to preview it live.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://www.youtube.com/embed/..."
                  value={customEmbedUrl}
                  onChange={(e) => setCustomEmbedUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {customEmbedUrl && (
                  <button
                    onClick={() => setCustomEmbedUrl('')}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Chapters (if available) & Key Takeaways */}
        <div className="lg:col-span-4 space-y-4">
          {/* Chapters / Timeline (Only rendered if topic defines chapters) */}
          {hasChapters && video.chapters && video.chapters.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Lesson Timeline & Chapters
              </h4>
              <div className="space-y-1.5">
                {video.chapters.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveChapter(idx);
                      setIsPlayingPlaceholder(true);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      activeChapter === idx
                        ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-2">{chapter.title}</span>
                    <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0 text-slate-500">
                      {chapter.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Lesson Takeaways */}
          <div className="bg-indigo-50/60 rounded-xl p-5 border border-indigo-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Key Lesson Takeaways
            </h4>
            <ul className="space-y-2.5">
              {video.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-indigo-950 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
