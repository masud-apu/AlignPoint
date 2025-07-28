import { Milestone } from '../../types'

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className={`p-4 border ${
      milestone.status === 'completed' ? 'border-green-200 bg-green-50' :
      milestone.status === 'in_progress' ? 'border-blue-200 bg-blue-50' :
      'border-alignpoint-gray-200 bg-alignpoint-gray-50'
    } rounded-lg`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-alignpoint-black">{milestone.title}</h4>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
          milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {milestone.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      </div>
      <p className="text-sm text-alignpoint-gray-600 mb-2">{milestone.description}</p>
      <div className="text-xs text-alignpoint-gray-500">
        {milestone.status === 'completed' ? 
          `Completed on ${milestone.completionDate}` :
          `Due by ${milestone.dueDate}`
        }
      </div>
    </div>
  )
}
