// module.exports = {
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIDs: false,
          removeUselessDefs: false,
        },
      },
    },
  ]
}
