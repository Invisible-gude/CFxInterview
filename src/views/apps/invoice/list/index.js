// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Flatpickr from 'react-flatpickr'

// ** Third Party Components
import { FileText, Hash, Edit, ChevronDown, X, Plus } from 'react-feather'
import {
  Label, Input, CustomInput, Row, Col, Card, Form, FormGroup,
  InputGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import Sidebar from '@components/sidebar'
// ** Store & Actions
import { useSelector } from 'react-redux'
import Repeater from '@components/repeater'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/page-auth.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '../../../../assets/scss/my-css.css'
import axios from 'axios'
import Select from 'react-select'


const CustomHeader = () => {
  return (
    <div className='div-body'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <FileText
              id='header'
              size={18}
              color='#5c80ed'
            />
            <h5 for='rows-per-page' className='mb-0'>ใบเสนอราคา</h5>
          </div>
        </Col>
      </Row>
      <h3 for='rows-per-page' className='mb-0' style={{ color: '#5c80ed' }}>QT2021020001</h3>
    </div>
  )
}
const CustomBody = ({ setData, setOpenSidebar, openSidebar }) => {

  const [dueDate, setDueDate] = useState(new Date())
  const [selectedValue, setSelectedValue] = useState(3)
  const [discountCheck, setDiscountCheck] = useState(false)
  const [vatCheck, setVatCheck] = useState(false)
  const [add, setAdd] = useState([])
  const [selectedDiscountValue, setSelectedDiscountValue] = useState('(%)')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [count, setCount] = useState(3)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  const handleDiscountChange = (value) => {
    setSelectedDiscountValue(value)
    console.log(value)
  }
  const topMenu = [
    {
      img: require('@src/assets/images/icons/printing.png').default,
      label: 'พิมพ์เอกสาร'
    },
    {
      img: require('@src/assets/images/icons/download.png').default,
      label: 'ดาวน์โหลด'
    },
    {
      img: require('@src/assets/images/icons/ellipsis.png').default,
      label: 'เพิ่มเติม'
    }
  ]
  const handleChange = e => {
    setSelectedValue(e.value)
    if (e.value === 'add') {
      setOpenSidebar(!openSidebar)
    } else {
      const customerData = setData.find(items => items.value === e.value)
      setAdd(customerData.data)
      console.log(customerData)
    }
    console.log(e.value)
  }
  const onChangeDiscount = e => {
    setDiscountCheck(e.target.checked)
    console.log(e.target.checked)
  }
  const onChangeVat = e => {
    setVatCheck(e.target.checked)
    console.log(e.target.checked)
  }

  return (
    <div className='div-body'>
      <Row>
        <Col lg={6}>
          <FormGroup className="input-width">
            <Label for="exampleSelect" className="label">ชื่อลูกค้า</Label>
            <Select
              options={setData}
              value={setData.find(obj => obj.value === selectedValue)}
              placeholder=""
              onChange={handleChange}
            />
          </FormGroup>
          <Label for="exampleSelect" className="label">รายละเอียด</Label>
          <div class="flex-container">
            <div class="flex-item-left">
              <Input type="textarea" name="address" id="exampleText" placeholder="รายละเอียดที่อยู่" value={add.address} />
            </div>
            <div class="flex-item-right">
              <InputGroup>
                <Edit
                  id='header'
                  size={14}
                  color='#5c80ed'
                  style={{ alignSelf: 'center', marginLeft: '10px', marginRight: '5px' }}
                />
                <Label for='rows-per-page' className='mb-0' className="labelblue">  แก้ไขรายชื่อผู้ติดต่อ</Label>
              </InputGroup>
            </div>
          </div>
          <FormGroup className="input-width">
            <Input type="text" name="zipcode" id="exampleZipcode" placeholder="รหัสไปรษณีย์" value={add.zipcode} />
            <Input type="text" name="TIN" id="exampleTIN" placeholder="เลขประจำตัวผู้เสียภาษี" value={add.tin} />
            <Input type="text" name="company" id="exampleCompany" placeholder="สำนักงาน/สาขาเลขที่" value={add.country} />
          </FormGroup>
        </Col>
        <Col lg={6}>
          <div class="float-right">
            <Row >
              <Col xs={4}>
                <h5 for="exampleDate" sm={2} className="label">วันที่:</h5>
              </Col>
              <Col xs={8}>
                <InputGroup>
                  <Flatpickr
                    id='due-date'
                    name='due-date'
                    className='form-control'
                    // onChange={date => setDueDate(date[0])}
                    value={dueDate}
                    options={{ dateFormat: 'Y-m-d' }}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <h5 for="exampleCash" sm={2} className="label">เงินสด:</h5>
              </Col>
              <Col xs={8}>
                <InputGroup>
                  <Input type="select" name="select" id="exampleSelect" disabled>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <h5 for="exampleDate" sm={3} className="label">พนักงานขาย:</h5>
              </Col>
              <Col xs={8}>
                <InputGroup>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Employee #A</option>
                    <option>Employee #B</option>
                    <option>Employee #C</option>
                    <option>Employee #D</option>
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <FormGroup>
              <div>
                <CustomInput type="checkbox" id="exampleDiscount" label="ส่วนลดแยกรายการ" onChange={onChangeDiscount} />
                <CustomInput type="checkbox" id="exampleVat" label="ภาษีมูลค่าเพิ่มแยกรายการ" onChange={onChangeVat} />
              </div>
            </FormGroup>
          </div>
        </Col>
      </Row >
      <hr />
      <Row >
        <Col lg={1} style={{ alignSelf: 'center' }}>
          <Label for="exampleprojectName" className="label">ชื่อโปรเจค:</Label>
        </Col>
        <Col lg={8}>
          <Input type="text" name="projectName" id="exampleprojectName" placeholder="" />
        </Col>
        <Col lg={1} style={{ alignSelf: 'center' }}>
          <Label for="exampleprojectId" className="label">เลขที่อ้างอิง:</Label>
        </Col>
        <Col lg={2}>
          <Input type="text" name="projectId" id="exampleprojectId" placeholder="" />
        </Col>
      </Row>
      <br />

      <div className="div-table p-2  ">
        <Row>
          <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg={4} sm={12}>
            <Label className='col-title mb-md-50 mb-0 label'>ชื่อสินค้า/รายละเอียด</Label>
          </Col>
          <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg={2} sm={12}>
            <Label className='col-title mb-md-2 mb-0 label'>จำนวน</Label>
          </Col>
          {
            discountCheck &&
            <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg={1} sm={12} row>
              <Row>
                <Col lg={7}>
                  <Label className='col-title mb-md-50 mb-0 label'>ส่วนลด{selectedDiscountValue}</Label>
                </Col>
                <Col>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      tag="span"
                      data-toggle="dropdown"
                      aria-expanded={dropdownOpen}
                    >
                      <ChevronDown
                        id='header'
                        size={13}
                      />
                    </DropdownToggle>
                    <DropdownMenu container="body">
                      <DropdownItem onClick={() => handleDiscountChange('(%)')}>เปอร์เซ็น (%)</DropdownItem>
                      <DropdownItem onClick={() => handleDiscountChange('(฿)')}>จำนวนเงิน (฿)</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          }
          {
            vatCheck &&
            <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg={1} sm={12}>
              <Label className='col-title mb-md-50 mb-0 label'>ภาษี</Label>
            </Col>
          }
          <Col
            className='my-lg-0 my-2 pl-0'
            lg={!discountCheck && !vatCheck ? 2 : discountCheck && !vatCheck ? 2 : !discountCheck && vatCheck ? 2 : 1}
            sm='12'>
            <Label className='col-title mb-md-2 mb-0 label'>หน่วย</Label>
          </Col>
          <Col
            className='my-lg-0 mt-2 pl-0'
            lg={!discountCheck && !vatCheck ? 2 : 1}
            sm={12}>
            <Label className='col-title mb-md-50 mb-0 label'>ราคาต่อหน่วย</Label>
          </Col>
          <Col
            className='my-lg-0 mt-2 pl-0'
            lg={2}
            sm={12}>
            <Label className='col-title mb-md-50 mb-0 label'>ราคารวม</Label>
          </Col>
        </Row>
        <Repeater count={count}>
          {i => {
            return (
              <Form key={i} className='repeater-wrapper'>
                <Row>
                  <Col className='d-flex product-details-border position-relative pr-0' sm={12}>
                    <Row className='w-100 pr-lg-0 pr-1 py-2'>
                      <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg={4} sm={12}>
                        <Input type='select' className='item-details'>
                          <option>App Design</option>
                          <option>App Customization</option>
                          <option>ABC Template</option>
                          <option>App Development</option>
                        </Input>
                        <Input type='textarea' defaultValue='' />
                      </Col>
                      <Col className='my-lg-0 my-2 pl-0' lg={2} sm={12}>
                        <Input type='number' className='text-right' defaultValue='1' placeholder='' />
                      </Col>
                      {
                        discountCheck &&
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg={1} sm={12}>
                          <Input type='text' className='text-right' defaultValue='1' />
                        </Col>
                      }
                      {
                        vatCheck &&
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg={1} sm={12}>
                          <Input type='text' className='text-right' defaultValue='1' />
                        </Col>
                      }
                      <Col
                        className='my-lg-0 my-2 pl-0'
                        lg={!discountCheck && !vatCheck ? 2 : discountCheck && !vatCheck ? 2 : !discountCheck && vatCheck ? 2 : 1}
                        sm={12}>
                        <Input type='select' className='item-details'>
                          <option>ชิ้น</option>
                          <option>กล่อง</option>
                          <option>แพค</option>
                        </Input>
                      </Col>
                      <Col
                        className='my-lg-0 mt-2 pl-0'
                        lg={!discountCheck && !vatCheck ? 2 : 1}
                        sm={12}>
                        <Input type='number' className='text-right' defaultValue='1' placeholder='' />
                      </Col>
                      <Col className='my-lg-0 mt-2 pl-0 text-right' lg={1} sm={12}>
                        <Input type='text' className='text-right' defaultValue='1' />
                      </Col>
                      <Col className='my-lg-0 mt-2 p-0 text-center' lg={1} sm={12}>
                        <Button.Ripple color='danger' className='text-nowrap px-1' onClick={deleteForm} >
                          <X size={14} className='mr-50' />
                          <span></span>
                        </Button.Ripple>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )
          }}
        </Repeater>
        <Button outline color="primary" onClick={increaseCount}>+ เพิ่มรายการสินค้า</Button>
      </div>
      <br />
      <br />
      <br />

      <Row>
        <Col lg={6}>
          <CustomInput type="checkbox" id="exampleLicense" label="ลายเซ็นอิเล็กทรอนิกส์และตรายาง" />
          <br />
          <Row >
            <Col xs={5}>
              <Label for="exampleSelect" className="label">หมายเหตุ: </Label>
              <Input type="textarea" name="ps" id="examplePS" placeholder="" />
            </Col>
            <Col xs={5}>
              <Label for="exampleSelect" className="label">โน๊ตภายในบริษัท: </Label>
              <Input type="textarea" name="note" id="exampleNote" placeholder="" />
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <div class="float-right">
            <Row>
              <Col xs={5}>
                <Label for="exampleSelect" className="labelblue">รวมเป็นเงิน </Label>
              </Col>
              <Col>
              </Col>
              <Col>
                <Label for="exampleSelect" className="label-footer">2000.00</Label>
              </Col>
            </Row>
            <Row>
              <Col style={{ alignSelf: 'center' }} xs={5}>
                <Label for="exampleDate" className="labelblue" style={{ alignSelf: 'center' }}>ค่าส่วนลด</Label>
              </Col>
              <Col>
                <Row>
                  <Col xs={9}>
                    <Input type="text" name="projectId" id="exampleprojectId" placeholder="" />
                  </Col>
                  <Col style={{ alignSelf: 'center' }} xs={1}>
                    <Label for="exampleSelect" className="labelblue">%</Label>
                  </Col>
                </Row>
              </Col>
              <Col style={{ alignSelf: 'center' }}>
                <Label for="exampleSelect" className="label-footer">100.00</Label>
              </Col>
            </Row>
            <Row>
              <Col xs={5}>
                <Label for="exampleSelect" className="labelblue">ราคาหลังหักส่วนลด </Label>
              </Col>
              <Col>
              </Col>
              <Col>
                <Label for="exampleSelect" className="label-footer">1900.00</Label>
              </Col>
            </Row>
            <Row>
              <Col xs={5}>
                <Label for="exampleSelect" className="labelblue">จำนวนเงินรวมทั้งสิ้น </Label>
              </Col>
              <Col>
              </Col>
              <Col>
                <Label for="exampleSelect" className="label-footer">1900.00</Label>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col style={{ alignSelf: 'center' }} xs={5}>
                <Row>
                  <Col xs={1}>
                    <CustomInput type="checkbox" id="exampleVatCheck" className="labelblue" />
                  </Col>
                  <Col>
                    <Label for="exampleSelect" className="labelblue">หักภาษี ณ ที่จ่าย </Label>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Input type="select" name="select" id="exampleSelect" >
                  <option>3%</option>
                  <option>7%</option>
                </Input>
              </Col>
              <Col style={{ alignSelf: 'center' }}>
                <Label for="exampleSelect" className="label-footer">57.00</Label>
              </Col>
            </Row>
            <Row>
              <Col xs={5}>
                <Label for="exampleSelect" className="labelblue">ยอดชำระ </Label>
              </Col>
              <Col>
              </Col>
              <Col>
                <Label for="exampleSelect" className="label-footer">1843.00</Label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div >
  )
}

const InvoiceList = () => {
  const store = useSelector(state => state.invoice)

  const [data, setData] = useState([])
  const [statusValue, setStatusValue] = useState('')
  const options = [{ value: "add", label: '+เพิ่มลูกค้าใหม่' }]
  const [openSidebar, setOpenSidebar] = useState(false)
  const countryOptions = [
    { value: 'australia', label: 'Australia' },
    { value: 'canada', label: 'Canada' },
    { value: 'russia', label: 'Russia' },
    { value: 'saudi-arabia', label: 'Saudi Arabia' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'switzerland', label: 'Switzerland' },
    { value: 'united-kingdom', label: 'United Kingdom' },
    { value: 'united-arab-emirates', label: 'United Arab Emirates' },
    { value: 'united-states-of-america', label: 'United States of America' }
  ]

  useEffect(() => {
    axios.get('api/invoice/clients').then(res => {
      const arr = options
      res.data.map(item => arr.push({ value: item.name, label: item.name, data: item }))
      setData(arr)
      // console.log(data)
    })
  }, [])


  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <CustomHeader
            statusValue={statusValue}
          />
        </div>
      </Card>
      <Card>
        <div className='invoice-list-dataTable'>
          <CustomBody
            setData={data}
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
          />
        </div>
      </Card>
      <Sidebar
        size='lg'
        open={openSidebar}
        title='Add Payment'
        headerClassName='mb-1'
        contentClassName='p-0'
        toggleSidebar={() => setOpenSidebar(!openSidebar)}
      >
        <Form>
          <FormGroup>
            <Label for='customer-name' className='form-label'>
              Customer Name
            </Label>
            <Input id='customer-name' placeholder='John Doe' />
          </FormGroup>
          <FormGroup>
            <Label for='customer-email' className='form-label'>
              Customer Email
            </Label>
            <Input type='email' id='customer-email' placeholder='example@domain.com' />
          </FormGroup>
          <FormGroup>
            <Label for='customer-address' className='form-label'>
              Customer Address
            </Label>
            <Input type='textarea' cols='2' rows='2' id='customer-address' placeholder='1307 Lady Bug Drive New York' />
          </FormGroup>
          <FormGroup>
            <Label for='country' className='form-label'>
              Country
            </Label>
            <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              isClearable={false}
            />
          </FormGroup>
          <FormGroup>
            <Label for='customer-contact' className='form-label'>
              Contact
            </Label>
            <Input type='number' id='customer-contact' placeholder='763-242-9206' />
          </FormGroup>
          <FormGroup className='d-flex flex-wrap mt-2'>
            <Button className='mr-1' color='primary' onClick={() => setOpenSidebar(!openSidebar)}>
              Add
            </Button>
            <Button color='secondary' onClick={() => setOpenSidebar(!openSidebar)} outline>
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Sidebar>

    </div>
  )
}

export default InvoiceList
