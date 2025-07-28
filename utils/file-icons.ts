export function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'figma':
      return '🎨'
    case 'pdf':
      return '📄'
    case 'doc':
    case 'docx':
      return '📝'
    case 'xls':
    case 'xlsx':
      return '📊'
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '🖼️'
    default:
      return '📁'
  }
}
