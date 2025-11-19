const styleRegistry = {
  resolve(style) {
    if (!style) {
      return null
    }

    return {
      style
    }
  }
}

export default styleRegistry
