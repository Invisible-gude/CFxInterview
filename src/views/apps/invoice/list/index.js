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

import axios from 'axios'
import Select from 'react-select'


const CustomHeader = () => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
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
  const total_price = '1,900.00'
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
    <div className='invoice-list-table-body w-100 py-2'>
      <Row>
        <Col>
          <Row>
            <Col xs="9">
              <Col>
                <Col xs="5">
                  <FormGroup>
                    <Label for="exampleSelect">ชื่อลูกค้า</Label>
                    <Select
                      options={setData}
                      value={setData.find(obj => obj.value === selectedValue)}
                      placeholder=""
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12">
                  <Label for="exampleSelect">รายละเอียด</Label>
                  <Row>
                    <Col xs="5">
                      <Input type="textarea" name="address" id="exampleText" placeholder="รายละเอียดที่อยู่" value={add.address} />
                    </Col>
                    <Col className='d-flex align-items-center px-0 px-lg-1'>
                      <Edit
                        id='header'
                        size={10}
                        color='#5c80ed'
                      />

                      <Label for='rows-per-page' className='mb-0' style={{ color: '#5c80ed' }}>แก้ไขรายชื่อผู้ติดต่อ</Label>
                    </Col>
                  </Row>
                </Col>
                <Col xs="5">
                  <Input type="text" name="zipcode" id="exampleZipcode" placeholder="รหัสไปรษณีย์" value={add.zipcode} />
                  <Input type="text" name="TIN" id="exampleTIN" placeholder="เลขประจำตัวผู้เสียภาษี" value={add.tin} />
                  <Input type="text" name="company" id="exampleCompany" placeholder="สำนักงาน/สาขาเลขที่" value={add.country} />
                </Col>
              </Col>
            </Col>

            <Col xs="3" className="p-2 d-flex flex-column pr-100" >
              <Row>
                <Col xs="4"></Col>
                {topMenu.map(item => <Col>
                  <div>
                    <img className='d-block  mr-50' src={item.img} height='26' width='26' alt={item.label} />
                    <Label>{item.label}</Label>
                  </div>
                </Col>
                )}
              </Row>
              <FormGroup row>
                <h5 for="exampleEmail" sm={2}>จำนวนเงินรวมทั้งสิ้น</h5>
              </FormGroup>
              <FormGroup row>
                <h1 for="exampleEmail" sm={2} style={{ color: '#5c80ed' }}>{total_price}</h1>
              </FormGroup>
              <Row>
                <Col xs="4">
                  <h5 for="exampleDate" sm={2}>วันที่:</h5>
                </Col>
                <Col xs="7">
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
                <Col xs="4">
                  <h5 for="exampleCash" sm={2}>เงินสด:</h5>
                </Col>
                <Col xs="7">
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
                <Col xs="4">
                  <h5 for="exampleDate" sm={2}>พนักงานขาย:</h5>
                </Col>
                <Col xs="7">
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
            </Col>

          </Row>
          <hr />
          <Col>
            <Col>
              <Row>
                <Col xs="9">
                  <FormGroup row>
                    <h5 for="exampleprojectName" sm={2}>ชื่อโปรเจค:</h5>
                    <Col>
                      <InputGroup>
                        <Input type="text" name="projectName" id="exampleprojectName" placeholder="" />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs="3">
                  <FormGroup row>
                    <h5 for="exampleprojectId" sm={2}>เลขที่อ้างอิง:</h5>
                    <Col>
                      <InputGroup>
                        <Input type="text" name="projectId" id="exampleprojectId" placeholder="" />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Col>


            <Row className='justify-content-between align-items-center align-content-center'>
              {/* <Col md={1}>
                <FormGroup>
                  <Label for={`item-name`}>ลำดับ</Label>
                </FormGroup>
              </Col> */}
              <Col md={3}>
                <FormGroup>
                  <Label for={`cost`}>ชิ่อสินค้า/รายละเอียด</Label>
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label for={`quantity`}>ราคาต่อหน่วย</Label>
                </FormGroup>
              </Col>
              {discountCheck === true ? <Col xs={1}>
                <FormGroup row>
                  <Label for="exampleEmail" >ส่วนลด {selectedDiscountValue}</Label>
                  <Col sm={2}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={dropdownOpen}
                      >
                        <ChevronDown
                          id='header'
                          size={10}
                        />
                      </DropdownToggle>

                      <DropdownMenu container="body">
                        <DropdownItem onClick={() => handleDiscountChange('(%)')}>เปอร์เซ็น (%)</DropdownItem>
                        <DropdownItem onClick={() => handleDiscountChange('(฿)')}>จำนวนเงิน (฿)</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </FormGroup>
              </Col> : null}
              {vatCheck === true ? <Col md={1}>
                <FormGroup>
                  <Label for={`quantity`}>ภาษี</Label>
                </FormGroup>
              </Col> : null}
              <Col md={1}>
                <FormGroup>
                  <Label for={`quantity`}>จำนวน</Label>
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label for={`quantity`}>หน่วย</Label>
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label for={`quantity`}>ราคารวม</Label>
                </FormGroup>
              </Col>
              <Col md={1}>
              </Col>
            </Row>
            <hr />

            <Repeater count={count}>
              {i => (
                <Form key={i}>
                  <Row className='justify-content-between align-items-center'>
                    {/* <Col md={1}>
                      <FormGroup>
                        <Label>{i + 1}</Label>
                      </FormGroup>
                    </Col> */}
                    <Col md={3}>
                      <FormGroup>
                        <Input type="select" name="appSelect" id="exampleAppSelect">
                          <option>App Design</option>
                          <option>App Customization</option>
                          <option>ABC Template</option>
                          <option>App Development</option>
                        </Input>
                        <Input type='textarea' id={`cost-${i}`} placeholder='' />
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <FormGroup>
                        <Input type='number' id={`quantity-${i}`} placeholder='' value={1} className="" />
                      </FormGroup>
                    </Col>
                    {discountCheck === true ? <Col xs={1}>
                      <FormGroup row>
                        <Input type='number' id={`quantity-${i}`} placeholder='' value={1} className="" />
                      </FormGroup>
                    </Col> : null}
                    {vatCheck === true ? <Col md={1}>
                      <FormGroup>
                        <Input type='number' id={`quantity-${i}`} placeholder='' value={1} className="" />
                      </FormGroup>
                    </Col> : null}
                    <Col md={1}>
                      <FormGroup>
                        <Input type='number' id={`quantity-${i}`} placeholder='' value={1} className="" />
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <FormGroup>
                        <Input type="select" name="unitSelect" id="exampleUnitSelect">
                          <option>ชิ้น</option>
                          <option>กล่อง</option>
                          <option>แพค</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <FormGroup>
                        <Input type='number' id={`quantity-${i}`} placeholder='' value={1} className="" />
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <Button.Ripple color='danger' className='text-nowrap px-1' onClick={deleteForm} >
                        <X size={14} className='mr-50' />
                        <span></span>
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              )}
            </Repeater>
            <Button outline color="primary" onClick={increaseCount}>+ เพิ่มรายการสินค้า</Button>
            <br />
            <br />
            <br />

            <Row>
              <Col xs="9">
                <CustomInput type="checkbox" id="exampleLicense" label="ลายเซ็นอิเล็กทรอนิกส์และตรายาง" />
                <br />

                <Col xs="7">
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleSelect">หมายเหตุ: </Label>
                        <Input type="textarea" name="address" id="exampleText" placeholder="รายละเอียดที่อยู่" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="exampleSelect" >โน๊ตภายในบริษัท: </Label>
                        <Input type="textarea" name="address" id="exampleText" placeholder="รายละเอียดที่อยู่" />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col xs="3">
                <Row>
                  <Col xs="9">
                    <Label for="exampleSelect" style={{ color: '#5c80ed' }}>รวมเป็นเงิน </Label>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect">2000.00</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="9">
                    <FormGroup row>
                      <Label for="exampleDate" sm={4} style={{ color: '#5c80ed' }}>ค่าส่วนลด</Label>
                      <Col sm={6}>
                        <InputGroup>
                          <Input type="text" name="projectId" id="exampleprojectId" placeholder="" />
                        </InputGroup>
                      </Col>
                      <Label for="exampleSelect" style={{ color: '#5c80ed' }}>%</Label>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect" >100.00</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="9">
                    <Label for="exampleSelect" style={{ color: '#5c80ed' }}>ราคาหลังหักส่วนลด </Label>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect">1900.00</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="9">
                    <Label for="exampleSelect" style={{ color: '#5c80ed' }}>จำนวนเงินรวมทั้งสิ้น </Label>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect">1900.00</Label>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs="9">
                    <FormGroup row>
                      <CustomInput type="checkbox" id="exampleVatCheck" />
                      <Label style={{ color: '#5c80ed' }}>หักภาษี ณ ที่จ่าย</Label>
                      <Col sm={6}>
                        <InputGroup>
                          <Input type="select" name="select" id="exampleSelect" >
                            <option>3%</option>
                            <option>7%</option>
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect">57.00</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="9">
                    <Label for="exampleSelect" style={{ color: '#5c80ed' }}>ยอดชำระ </Label>
                  </Col>
                  <Col xs="3">
                    <Label for="exampleSelect">1843.00</Label>
                  </Col>
                </Row>

              </Col>
            </Row>

          </Col>
          {/* <hr /> */}
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
