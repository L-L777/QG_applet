import Toast from '@vant/weapp/toast/toast';
import PopUp from '../../../utils/tools/PopUp';
import {
  NewerInterview
} from '../../../utils/request/api'; //接口
import {
  checkForm
} from "../../../utils/tools/checkForm"; //方法
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arraySex: ['男', '女'],
    indexSex: 0,
    arrayDir: ['人工智能组', '工业软件-前端组', '工业软件-后台组',  '嵌入式组', '图形组', '工业软件-移动组','设计组'],
    indexDir: 0,
    arrayAcademy: ['计算机学院', '自动化学院', '信息工程学院', '物理与光电工程学院', '外国语学院', '机电工程学院', '土木与交通工程学院', '轻工化工学院', '材料与能源学院', '管理学院', '环境科学与工程学院', '艺术与设计学院', '法学院', '继续教育学院', '数学与统计学院', '马克思主义学院', '建筑与城市规划学院', '经济与贸易学院', '生物医药学院', '集成电路学院', '国际教育学院', '生态环境与资源学院', '先进制造学院'],
    indexAcademy: 0,
    arrayMajor: ['否', '是'],
    indexMajor: 0,
    showPickerPop: false,
    name: "",
    english: "",
    age: "", //
    organization: "",
    dormitory: "",
    motto: "",
    studentId: "",
    phone: "",
    gpa: "", //
    major: "",
    cexperiment: "", //
    ctheory: "", //
    gender: '', //
    flunk: '', //
    college: '', //
    formSubmitted: false, // 控制表单是否已经提交
    loading: false,
    // 检查表单对象
    checkClass: {},
    isHide: false, //智慧权限
    isRight: false, //确认
  },

  /**
   * @description 修改选择器的值-公共函数
   */
  changePickerValue(value, key) {
    const data = {};
    data[key] = value;
    data.showPickerPop = false;
    this.setData(data);
  },

  /**
   * @description 修改性别index
   * @param {*} e 
   */
  bindPickerChangeSex: function (e) {
    this.changePickerValue(e.detail.value, 'indexSex');
  },

  /**
   * @description 修改意向小组index
   * @param {*} e 
   */
  bindPickerChangeDir: function (e) {
    console.log(e.detail.value)
    this.changePickerValue(e.detail.value, 'indexDir');
  },

  /**
   * @description 修改挂科状态index
   * @param {*} e 
   */
  bindPickerChangeMajor: function (e) {
    this.changePickerValue(e.detail.value, 'indexMajor');
  },

  /**
   * @description 修改学院index
   * @param {*} e 
   */
  bindPickerChangeAcademy: function (e) {
    this.changePickerValue(e.detail.value, 'indexAcademy');
  },

  /**
   * @description 显示级联选择器
   */
  showPicker: function () {
    this.setData({
      showPickerPop: true
    })
  },

  /**
   * @description 表单必填项校验
   */
  checkEmpty: function () {
    console.log(this.data);
    let nameVal = this.data.name.trim();
    let ageVal = this.data.age + ''.trim();
    let studentIdVal = this.data.studentId.trim();
    let majorVal = this.data.major.trim();
    let phoneVal = this.data.phone.trim();
    let gpaVal = this.data.gpa + ''.trim();
    let {
      checkClass
    } = this.data;
    if (!nameVal) {
      PopUp.Toast('请输入姓名', 3, 500)
      return false;
    };
    if (!checkClass.chinese(nameVal)) {
      PopUp.Toast('姓名格式不正确，请检查', 3, 500)
      return false;
    };

    if (!ageVal) {
      PopUp.Toast('请输入年龄', 3, 500)
      return false;
    };
    if (!checkClass.age(ageVal)) {

      PopUp.Toast('年龄格式不正确，请检查', 3, 500)
      return false;
    };

    if (!studentIdVal) {
      PopUp.Toast('请输入学号', 3, 500)
      return false;
    };
    if (!checkClass.numberNum(studentIdVal)) {
      PopUp.Toast('学号格式不正确', 3, 500)
      return false;
    };
    if (!majorVal) {
      PopUp.Toast('请输入专业班级', 3, 500)
      return false;
    };
    if (!phoneVal) {
      PopUp.Toast('请输入手机号', 3, 500)
      return false;
    };
    if (!checkClass.numberPhone(phoneVal)) {
      PopUp.Toast('手机号格式不正确，请检查', 3, 500)
      return false;
    };

    if (!gpaVal) {
      PopUp.Toast('请输入绩点排名', 3, 500)
      return false;
    };
    if (!checkClass.number(gpaVal)) {
      PopUp.Toast('绩点格式不正确，请检查', 3, 500)
      return false;
    };
    return true; // 验证通过，返回true
  },

  /**
   * @description 表单提交
   * @param {*} e 
   */
  formSubmit: async function (e) {
    const data = {
      name: e.detail.value.name,
      english: e.detail.value.english,
      age: +e.detail.value.age,
      organization: e.detail.value.organization,
      dormitory: e.detail.value.dormitory,
      motto: e.detail.value.motto,
      studentId: e.detail.value.studentId,
      phone: e.detail.value.phone,
      gpa: +e.detail.value.gpa, //rank绩点string改成绩点排名gpa int
      major: e.detail.value.major,
      cexperiment: e.detail.value.cexperiment,
      ctheory: e.detail.value.ctheory,
      gender: this.data.arraySex[this.data.indexSex],
      flunk: +this.data.indexMajor, //0没挂，1挂科
      intention: +this.data.indexDir + 1,
      college: this.data.arrayAcademy[this.data.indexAcademy],
    };
    this.setData({
      ...data
    });
    //校验数值是否为空
    let isEmpty = this.checkEmpty();
    console.log('isEmpty', isEmpty);
    if (isEmpty) {
      let result = await PopUp.Confirm('确认要提交报名表了吗？');
      if (result) {
        // on confirm
        try {
          const response = await NewerInterview.submitInfo(data);
          console.log('response', response);
          if (response.code === 200) {
            setTimeout(() => {
              this.setData({
                formSubmitted: true
              });
            }, 500);
            PopUp.Toast(response.message, 1, 1000)
            setTimeout(() => {
              wx.navigateTo({
                url: '../hub/hub'
              });
            }, 1500);
          } else if (response.code === 111) { //已过报名时间
            PopUp.Toast(response.message, 2, 1000)
          } else if (response.code === 401) {
            console.log(response.code)
            PopUp.Toast(response.message, 2, 1000)
            wx.removeStorageSync('platformToken')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 1500)
          } else {
            PopUp.Toast(response.message, 2, 500)
          }
        } catch (error) {
          // 处理请求失败的情况
          console.error('请求失败:', error);
          PopUp.Toast('请求失败', 2, 1000)
        }
      }
    }
  },

  /**
   * @description 根据字符串查找数组下标
   * @param {*} options 
   */
  findIndex: function (str, arrayTarget) {
    return arrayTarget.indexOf(str);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let checkClass = new checkForm();
    this.setData({
      checkClass
    });
    // 智慧接口
    try {
      const response = await NewerInterview.fool();
      console.log('response', response);
      let data = response.data;
      this.setData({
        isHide: data
      });
      // 每次审核前记得通知后台并设置为!data
      if (!data) {
        return
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('权限关闭', 2, 1000)
    }
    // 报名历史判断
    try {
      const response = await NewerInterview.getResume();
      if (response.code === 200 && response.data) {
        let data = response.data;
        console.log(data);
        this.setData({
          ...data,
          indexDir: parseInt(data.intention) - 1,
          indexMajor: parseInt(data.flunk),
          indexAcademy: this.findIndex(data.college, this.data.arrayAcademy),
          indexSex: this.findIndex(data.gender, this.data.arraySex)
        })
        console.log(this.data);
        let result = await PopUp.Confirm(`已经报名成功 , 需要更改信息吗？`);
        if (result) {
          // 确定显示
          let that = this
          setTimeout(() => {
            that.setData({
              isRight: true
            });
          }, 1000)
        } else {
          //取消跳转
          setTimeout(() => {
            wx.redirectTo({
              url: '../C_resume/C_resume',
            })
          }, 1000)
        }
      } else if (response.code === 401) {
        PopUp.Toast(response.message, 2, 1000)
        wx.removeStorageSync('platformToken')
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 1500)
      } else if (response.code === 205) {
        // 确定显示
        let that = this
        setTimeout(() => {
          that.setData({
            isRight: true
          });
        }, 1000)
      } else {
        PopUp.Toast(response.message, 2, 1000)
        console.log('未报名或者未通过上一轮')
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})