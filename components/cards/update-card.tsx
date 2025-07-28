import { ProjectUpdate } from '../../types'

export function UpdateCard({ update }: { update: ProjectUpdate }) {
  return (
    <div className="p-4 border border-alignpoint-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${
          update.type === 'milestone' ? 'bg-green-500' :
          update.type === 'file_shared' ? 'bg-blue-500' :
          'bg-alignpoint-red'
        }`} />
        <h4 className="font-medium text-alignpoint-black">{update.title}</h4>
      </div>
      <p className="text-sm text-alignpoint-gray-600 mb-2">{update.content}</p>
      <div className="text-xs text-alignpoint-gray-500">
        {update.author} • {update.date}
      </div>
    </div>
  )
}
