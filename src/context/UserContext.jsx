import React, { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // 模拟用户数据 - 实际项目中应该从API获取
  const mockUsers = {
    'demo@example.com': {
      id: 1,
      name: '演示用户',
      email: 'demo@example.com',
      password: 'demo123',
      isVip: false,
      vipExpiry: null,
      purchasedCourses: ['scratch-001', 'python-101'],
      avatar: 'https://ui-avatars.com/api/?name=演示用户&background=007bff&color=fff&size=100'
    },
    'vip@example.com': {
      id: 2,
      name: 'VIP用户',
      email: 'vip@example.com',
      password: 'vip123',
      isVip: true,
      vipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后过期
      purchasedCourses: [],
      avatar: 'https://ui-avatars.com/api/?name=VIP用户&background=FFD700&color=000&size=100'
    }
  }

  // 初始化时检查本地存储的用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('currentUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = mockUsers[email]
      if (mockUser && mockUser.password === password) {
        const userWithoutPassword = { ...mockUser }
        delete userWithoutPassword.password
        
        setUser(userWithoutPassword)
        setIsLoggedIn(true)
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
        return { success: true, user: userWithoutPassword }
      } else {
        return { success: false, error: '邮箱或密码错误' }
      }
    } catch (error) {
      return { success: false, error: '登录失败，请重试' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('currentUser')
  }

  const upgradeToVip = async (duration = 30) => {
    if (!isLoggedIn) {
      return { success: false, error: '请先登录' }
    }

    setLoading(true)
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const vipExpiry = new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
      const updatedUser = {
        ...user,
        isVip: true,
        vipExpiry: vipExpiry
      }
      
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      return { success: true, message: `VIP升级成功！有效期至 ${vipExpiry.toLocaleDateString()}` }
    } catch (error) {
      return { success: false, error: 'VIP升级失败，请重试' }
    } finally {
      setLoading(false)
    }
  }

  const purchaseCourse = async (courseId, price) => {
    if (!isLoggedIn) {
      return { success: false, error: '请先登录' }
    }

    setLoading(true)
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const updatedUser = {
        ...user,
        purchasedCourses: [...(user.purchasedCourses || []), courseId]
      }
      
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      return { success: true, message: '课程购买成功！' }
    } catch (error) {
      return { success: false, error: '课程购买失败，请重试' }
    } finally {
      setLoading(false)
    }
  }

  const checkCourseAccess = (courseId, isFree = false) => {
    if (isFree) return true
    if (!isLoggedIn) return false
    if (user?.isVip) return true
    return user?.purchasedCourses?.includes(courseId) || false
  }

  const getUserStats = () => {
    if (!isLoggedIn) return null
    
    return {
      totalPurchased: user?.purchasedCourses?.length || 0,
      isVip: user?.isVip || false,
      vipExpiry: user?.vipExpiry,
      joinDate: '2024-01-01' // 模拟加入日期
    }
  }

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    upgradeToVip,
    purchaseCourse,
    checkCourseAccess,
    getUserStats,
    mockUsers // 用于演示登录账号
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext



