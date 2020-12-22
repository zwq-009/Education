export const lhx_showModal = () => {
  return new Promise(resolve => {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要从购物车删除商品吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: resolve
    })
  })
}