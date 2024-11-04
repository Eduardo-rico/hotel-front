'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function HotelPredictor() {
  const [formData, setFormData] = useState({
    age: 30,
    annual_income: 50000,
    num_bookings_per_year: 5,
    avg_spend_per_booking: 1000,
    travel_frequency: 3,
    avg_stay_duration: 3,
    tech_usage_level: 5,
    loyalty_program_frequency: 10,
    distance_from_home: 100,
    num_rooms: 1,
    travel_purpose: 'business',
    accommodation_preference: 'mid_range_hotel',
    travels_with_family: 'no',
    main_activity: 'work',
    room_type: 'single',
    requires_transport: 'yes'
  })
  const [prediction, setPrediction] = useState('')
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPrediction('')

    try {
      const response = await fetch('https://hotel-xe1z.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setPrediction(data.customer_type)
      setIsModalOpen(true)
    } catch (error) {
      setError('Error al hacer la predicción. Por favor, intente de nuevo.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-[#003399] font-semibold mb-4">Predictor de Tipo de Cliente de Hotel</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="age">Edad</Label>
                <Input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} min={0} max={100} required />
              </div>
              <div>
                <Label htmlFor="annual_income">Ingreso Anual</Label>
                <Input type="number" id="annual_income" name="annual_income" value={formData.annual_income} onChange={handleInputChange} min={0} max={500000} required />
              </div>
              <div>
                <Label htmlFor="num_bookings_per_year">Reservas por Año</Label>
                <Input type="number" id="num_bookings_per_year" name="num_bookings_per_year" value={formData.num_bookings_per_year} onChange={handleInputChange} min={0} max={50} required />
              </div>
              <div>
                <Label htmlFor="avg_spend_per_booking">Gasto Promedio por Reserva</Label>
                <Input type="number" id="avg_spend_per_booking" name="avg_spend_per_booking" value={formData.avg_spend_per_booking} onChange={handleInputChange} min={0} max={100000} required />
              </div>
              <div>
                <Label htmlFor="travel_frequency">Frecuencia de Viaje</Label>
                <Input type="number" id="travel_frequency" name="travel_frequency" value={formData.travel_frequency} onChange={handleInputChange} min={1} max={12} required />
              </div>
              <div>
                <Label htmlFor="avg_stay_duration">Duración Promedio de Estadía</Label>
                <Input type="number" id="avg_stay_duration" name="avg_stay_duration" value={formData.avg_stay_duration} onChange={handleInputChange} min={1} max={15} required />
              </div>
              <div>
                <Label htmlFor="tech_usage_level">Nivel de Uso de Tecnología</Label>
                <Input type="number" id="tech_usage_level" name="tech_usage_level" value={formData.tech_usage_level} onChange={handleInputChange} min={0} max={10} required />
              </div>
              <div>
                <Label htmlFor="loyalty_program_frequency">Frecuencia de Programa de Lealtad</Label>
                <Input type="number" id="loyalty_program_frequency" name="loyalty_program_frequency" value={formData.loyalty_program_frequency} onChange={handleInputChange} min={0} max={50} required />
              </div>
              <div>
                <Label htmlFor="distance_from_home">Distancia desde Casa</Label>
                <Input type="number" id="distance_from_home" name="distance_from_home" value={formData.distance_from_home} onChange={handleInputChange} min={10} max={5000} required />
              </div>
              <div>
                <Label htmlFor="num_rooms">Número de Habitaciones</Label>
                <Input type="number" id="num_rooms" name="num_rooms" value={formData.num_rooms} onChange={handleInputChange} min={1} max={5} required />
              </div>
              <div>
                <Label htmlFor="travel_purpose">Propósito del Viaje</Label>
                <Select name="travel_purpose" value={formData.travel_purpose} onValueChange={(value) => handleSelectChange('travel_purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el propósito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Negocios</SelectItem>
                    <SelectItem value="leisure">Ocio</SelectItem>
                    <SelectItem value="mixed">Mixto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accommodation_preference">Preferencia de Alojamiento</Label>
                <Select name="accommodation_preference" value={formData.accommodation_preference} onValueChange={(value) => handleSelectChange('accommodation_preference', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la preferencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury_hotel">Hotel de Lujo</SelectItem>
                    <SelectItem value="mid_range_hotel">Hotel de Rango Medio</SelectItem>
                    <SelectItem value="hostel">Hostal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="travels_with_family">Viaja con Familia</Label>
                <Select name="travels_with_family" value={formData.travels_with_family} onValueChange={(value) => handleSelectChange('travels_with_family', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="main_activity">Actividad Principal</Label>
                <Select name="main_activity" value={formData.main_activity} onValueChange={(value) => handleSelectChange('main_activity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Trabajo</SelectItem>
                    <SelectItem value="relaxation">Relajación</SelectItem>
                    <SelectItem value="tourism">Turismo</SelectItem>
                    <SelectItem value="shopping">Compras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="room_type">Tipo de Habitación</Label>
                <Select name="room_type" value={formData.room_type} onValueChange={(value) => handleSelectChange('room_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Individual</SelectItem>
                    <SelectItem value="double">Doble</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requires_transport">Requiere Transporte</Label>
                <Select name="requires_transport" value={formData.requires_transport} onValueChange={(value) => handleSelectChange('requires_transport', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-[#003399] hover:bg-[#002266] text-white">Predecir</Button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Predicción del Tipo de Cliente</DialogTitle>
            <DialogDescription>
              Basado en la información proporcionada, el tipo de cliente predicho es:
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-[#CC0000] text-white rounded">
            <p className="font-bold">{prediction}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}