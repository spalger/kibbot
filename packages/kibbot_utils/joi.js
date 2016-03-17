
export function validateAgainstSchema(schema, rawValue, opts) {
  const { errors, value } = schema.validate(rawValue, opts)

  if (errors) {
    const describe = (m, detail) => `${m}${m ? '\n' : ''}at "${detail.path}" :: ${detail.message}`
    throw new Error(errors.details.reduce(describe, ''))
  }

  return value
}
