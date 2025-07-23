import React from 'react'
import Skeleton from './Skeleton'

const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200">
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <Skeleton variant="text" className="h-6 mb-2" width="80%" />
        
        {/* Description skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton variant="text" className="h-4" width="100%" />
          <Skeleton variant="text" className="h-4" width="90%" />
          <Skeleton variant="text" className="h-4" width="70%" />
        </div>

        {/* Technologies skeleton */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton variant="rectangular" className="h-6 rounded-full" width="60px" />
            <Skeleton variant="rectangular" className="h-6 rounded-full" width="80px" />
            <Skeleton variant="rectangular" className="h-6 rounded-full" width="70px" />
          </div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton variant="rectangular" className="flex-1 h-12 rounded-lg" />
          <Skeleton variant="rectangular" className="flex-1 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton