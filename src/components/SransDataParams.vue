<template>
    <div class="analyse">
        <slot name="title"></slot>
        <div class="col-left">
            <el-card class="box-card" v-show="isShowCounts">
                <h3 class="header">地址数据</h3>
                <el-divider class="divider"></el-divider>
                <div class="left">
                    <p>输入次数</p>
                    <p>输出次数</p>
                    <p>输入额度</p>
                    <p>输出额度</p>
                    <p>余额</p>
                </div>
                <div class="right">
                    <p>{{ inCount }}</p>
                    <p>{{ outCount }}</p>
                    <p class="green">{{ inValue }}</p>
                    <p class="red">{{ outValue }}</p>
                    <p class="blue">{{ value }}</p>
                </div>
            </el-card>
        </div>
        <div class="col-right">
            <div class="bar">
                <el-button @click="open" type="primary" plain>导入</el-button>
                <input ref="filElem" type="file" class="upload-file" @change="getFile" multiple="multiple" accept=".csv"
                       style="display: none">
                <el-button type="primary" plain class="shield" @click="select(1)">屏蔽</el-button>
                <el-button type="primary" plain @click="select(2)">标注</el-button>
                <el-button type="primary" plain @click="select(3)">设定</el-button>

                <div class="shield—card">
                    <el-card class="box-card" v-show="isShowShield">
                        <h3 class="header">屏蔽</h3>
                        <el-divider class="divider"></el-divider>
                        <div class="main">
                            <el-scrollbar style="height: 245px;">
                                <el-form class="form" label-width="15px" size="mini" label-position="left">
                                    <el-form-item v-for="(line,index) in lines1" :key="line"
                                                  :label="(index+1).toString()">
                                        <el-input class="input1" v-model="identificationShield[index]"></el-input>
                                        <el-button class="sub" icon="el-icon-remove-outline" circle
                                                   @click="decr(1)"></el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="plus" icon="el-icon-circle-plus-outline" circle
                                                   @click="incr(1)"></el-button>
                                    </el-form-item>
                                    <el-form-item class="btn">
                                        <el-button class="btn-c" @click="empty(1)">清空</el-button>
                                        <el-button class="btn-c" type="primary" @click="identificationConfirm(1)">确认
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </el-scrollbar>
                        </div>
                    </el-card>
                </div>
            </div>

            <div class="mark—card">
                <el-card class="box-card" v-show="isShowMark">
                    <h3 class="header">标注</h3>
                    <el-divider class="divider"></el-divider>
                    <div class="main">
                        <el-scrollbar style="height: 245px;">
                            <el-form class="form" label-width="15px" size="mini" label-position="left">
                                <el-form-item v-for="(line,index) in lines2" :key="line" :label="(index+1).toString()">
                                    <el-input class="input1" v-model="identificationMark1[index]"></el-input>
                                    <el-input class="input2" v-model="identificationMark2[index]"></el-input>
                                    <el-button class="sub" icon="el-icon-remove-outline" circle
                                               @click="decr(2)"></el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="plus" icon="el-icon-circle-plus-outline" circle
                                               @click="incr(2)"></el-button>
                                </el-form-item>
                                <el-form-item class="btn">
                                    <el-button class="btn-c" @click="empty(2)">清空</el-button>
                                    <el-button class="btn-c" type="primary" @click="identificationConfirm(2)">确认
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-scrollbar>
                    </div>
                </el-card>
            </div>

            <div class="set—card">
                <el-card class="box-card" v-show="isShowSet">
                    <h3 class="header">解析设定</h3>
                    <el-divider class="divider"></el-divider>
                    <div class="main">
                        <el-form class="form" label-width="100px" size="mini" label-position="left">
                            <el-form-item label="最大值">
                                <el-input class="input1" v-model="max"></el-input>
                            </el-form-item>
                            <el-form-item label="最小值">
                                <el-input class="input1" v-model="min"></el-input>
                            </el-form-item>
                            <el-form-item label="显示地址位数">
                                <el-input class="input1" v-model="addressBits"></el-input>
                            </el-form-item>
                            <el-form-item class="btn">
                                <el-button class="btn-c" @click="empty(3)">清空</el-button>
                                <el-button class="btn-c" type="primary" @click="setConfirm">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import axios from "axios";
    import BigDecimal from "bigdecimal";
    import MessageBox from "element-ui/packages/message-box/src/main";

    export default {
        data() {
            return {

                //#region 行数
                lines1: 1,
                lines2: 1,
                //#endregion

                //#region 显示、隐藏
                isShowShield: false,
                isShowMark: false,
                isShowSet: false,
                isShowCounts: false,
                //#endregion

                //#region 上传参数
                files: FileList,
                max: '',
                min: '',
                addressBits: '',
                identificationShield: [],
                identificationMark1: [],
                identificationMark2: [],
                identification: '',
                identification1: '',
                identification2: '',
                //#endregion

                //#region 地址数据
                inCount: Number,
                outCount: Number,
                inValue: BigDecimal,
                outValue: BigDecimal,
                value: BigDecimal,
                //#endregion
            }
        },
        methods: {

            //取消按键重置功能
            empty(id) {
                switch (id) {
                    case 1:
                        this.identificationShield = [];
                        this.identification1 = '';
                        this.lines1 = 1;
                        // this.select(1);
                        break;
                    case 2:
                        this.identificationMark1 = [];
                        this.identificationMark2 = [];
                        this.identification2 = '';
                        this.lines2 = 1;
                        // this.select(2);
                        break;
                    case 3:
                        this.max = '';
                        this.min = '';
                        this.addressBits = '';
                        // this.select(3);
                        break;
                }
            },

            //设定信息
            setConfirm() {
                if ([this.max, this.min, this.addressBits].filter(s => s != '').length != 0) {
                    this.getFile()
                } else {
                    this.$message.error('输入不能为空')
                }
            },

            //标注信息
            identificationConfirm(id) {
                switch (id) {
                    case 1:
                        this.identificationShield = this.identificationShield.filter(s => s != '')
                        if (this.identificationShield.length == 0) {
                            this.$message.error('输入不能为空')
                        } else {
                            this.identificationT()
                        }
                        break;
                    case 2:
                        this.identificationMark1 = this.identificationMark1.filter(s => s != '')
                        this.identificationMark2 = this.identificationMark2.filter(s => s != '')
                        if (this.identificationMark1.length == 0 && this.identificationMark2.length == 0) {
                            this.$message.error('输入不能为空')
                        } else {
                            this.identificationT()
                        }
                        break;
                }
            },
            identificationT() {
                let tem = '';
                for (let i = 0; i < this.identificationShield.length; i++) {
                    tem = tem + this.identificationShield[i] + ',- ';
                }
                this.identification1 = tem;
                tem = '';
                for (let i = 0; i < this.identificationMark1.length; i++) {
                    tem = tem + this.identificationMark1[i] + ',' + this.identificationMark2[i] + ' ';
                }
                this.identification2 = tem;
                tem = '';
                this.identification = this.identification1 + this.identification2;
                this.getFile();
            },

            //button选择
            select(id) {
                switch (id) {
                    case 1:
                        this.isShowShield = !this.isShowShield;
                        this.isShowMark = false;
                        this.isShowSet = false;
                        break;
                    case 2:
                        this.isShowMark = !this.isShowMark;
                        this.isShowShield = false;
                        this.isShowSet = false;
                        break;
                    case 3:
                        this.isShowSet = !this.isShowSet;
                        this.isShowMark = false;
                        this.isShowShield = false;
                        break;
                }

            },

            //box-card增加行
            incr(id) {
                switch (id) {
                    case 1:
                        this.lines1++;
                        break;
                    case 2:
                        this.lines2++;
                        break;
                }
            },

            //box-card减少行
            decr(id) {
                switch (id) {
                    case 1:
                        this.lines1--;
                        break;
                    case 2:
                        this.lines2--;
                        break;
                }
            },

            //选择文件
            open() {
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            },

            //上传文件
            getFile() {
                const that = this;

                if (this.$refs.filElem.files.length != 0) {
                    this.files = this.$refs.filElem.files;
                }
                if (this.files.length != 0) {
                    let param = new FormData();
                    for (let i = 0; i < this.files.length; i++) {
                        param.append("selectFiles", this.files[i]);
                    }
                    param.append("min", this.min);
                    param.append("max", this.max);
                    param.append("identification", this.identification);

                    axios.post('/api/dealDrawData', param)
                        .then(function (res) {
                            console.log(res.data);
                            if (res.data.code == 1000) {
                                sessionStorage.setItem("response", JSON.stringify(res.data));
                                that.$store.commit('getData', JSON.parse(sessionStorage.getItem("response")))
                                that.$parent.getList()
                            } else {
                                that.$message.error('输入错误')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            that.$message.error('请求失败');
                        });
                } else {
                    this.$message.error('请导入文件')
                }
            },

        }
    }

</script>

<style lang="scss">

    .analyse {
        height: 100%;

        .col-left {
            position: absolute;
            left: 0;
            top: 40px;
            z-index: 1;
            margin: 20px 30px;
            display: inline-block;

            .box-card {
                font-size: 12px;
                width: 240px;
                height: 195px;

                .el-card__body {
                    padding: 10px;
                }

                .header {
                    margin: 0 auto;
                    text-align: center;
                }

                .divider {
                    margin: 10px 0 0;
                    background: 0 0;
                    border-top: 1px dashed #e8eaec;
                }

                .left {
                    display: inline-block;
                }

                .right {
                    display: inline-block;
                    float: right;

                    p {
                        text-align: right;
                    }

                    .green {
                        color: green;
                    }

                    .red {
                        color: red;
                    }

                    .blue {
                        color: blue;
                    }
                }
            }
        }

        .col-right {
            position: absolute;
            left: 0;
            top: 40px;
            z-index: 1;
            margin: 20px 10px;
            display: inline-block;

            .shield {
                margin-left: 10px;
            }

            .el-button {
                padding: 10px 20px;
                font-size: 10px;
                border-radius: 6px;
            }

            .el-button--primary.is-plain {
                color: #409EFF;
                background: #FFFF;
                border-color: #409EFF;
            }

            .el-card__body {
                padding: 10px;
            }

            .bar {
                position: fixed;
                right: 10px;
            }

            .shield—card {
                .box-card {
                    margin: 10px 0 0 5px;
                    font-size: 12px;
                    height: 280px;

                    .header {
                        margin: 0 auto;
                        text-align: center;
                    }

                    .divider {
                        margin: 10px 0 10px;
                        background: 0 0;
                        border-top: 1px dashed #e8eaec;
                    }

                    .main {
                        display: inline-block;

                        .el-scrollbar__bar {
                            &.is-vertical {
                                width: 0; //滚动条宽度
                            }
                        }

                        .el-input {
                            width: 230px;
                        }

                        .btn {
                            position: relative;
                            left: 98px;

                            .btn-c {
                                padding: 7px 15px;
                            }
                        }

                        .plus {
                            width: 230px;
                            font-size: 17px;
                            color: gray;
                            padding: 5px;
                            border: 1px dashed #e8eaec;
                        }

                        .sub {
                            margin-top: 5px;
                            margin-left: 5px;
                            font-size: 17px;
                            color: gray;
                            padding: 0;
                            border-width: 0;
                        }
                    }
                }
            }

            .mark—card {
                position: fixed;
                top: 95px;
                right: 10px;

                .box-card {
                    margin: 10px 0 0 5px;
                    font-size: 12px;
                    height: 280px;
                    resize: vertical;

                    .header {
                        margin: 0 auto;
                        text-align: center;
                    }

                    .divider {
                        margin: 10px 0 10px;
                        background: 0 0;
                        border-top: 1px dashed #e8eaec;
                    }

                    .main {
                        display: inline-block;

                        .el-scrollbar__bar {
                            &.is-vertical {
                                width: 0; //滚动条宽度
                            }
                        }

                        .el-input {
                            width: 220px;
                        }

                        .input2 {
                            width: 100px;
                            margin-left: 5px;
                        }

                        .btn {
                            position: relative;
                            left: 193px;

                            .btn-c {
                                padding: 7px 15px;
                            }
                        }

                        .plus {
                            width: 325px;
                            font-size: 17px;
                            color: gray;
                            padding: 5px;
                            border: 1px dashed #e8eaec;
                        }

                        .sub {
                            margin-top: 5px;
                            margin-left: 5px;
                            font-size: 17px;
                            color: gray;
                            padding: 0;
                            border-width: 0;
                        }
                    }
                }
            }

            .set—card {
                position: fixed;
                top: 95px;
                right: 10px;

                .box-card {
                    margin: 10px 0 0 5px;
                    font-size: 12px;
                    width: 230px;
                    height: 240px;

                    .header {
                        margin: 0 auto;
                        text-align: center;
                    }

                    .divider {
                        margin: 10px 0 10px;
                        background: 0 0;
                        border-top: 1px dashed #e8eaec;
                    }

                    .main {
                        display: inline-block;

                        .el-input {
                            width: 110px;
                        }

                        .btn {
                            position: absolute;
                            right: 3px;

                            .btn-c {
                                padding: 7px 15px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>