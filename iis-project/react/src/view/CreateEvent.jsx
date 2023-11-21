import React, { useState, useRef, useEffect } from "react";
import axiosClient from "../axios-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-bootstrap-time-picker";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { LocationDropdown } from "../components/LocationDropdown";

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
};

export const CreateEvent = () => {

    //USE REFS 
    const nameRef = useRef();
    const capacityRef = useRef();
    const descriptionRef = useRef();

    //USE STATES

    //time and date use states
    const [selectedStartTime, setSelectedStartTime] = useState(0);
    const [selectedEndTime, setSelectedEndTime] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    //error use states
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    //category use states
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [lastClickedCategoryId, setLastClickedCategoryId] = useState(null);
    // Ticket use states
    const [tickets, setTickets] = useState([{ name:"", price: "", amount: "" }]);
    //location use states
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [payInAdvance, setPayInAdvance] = useState(false);

    const [isUnlimited, setIsUnlimited] = useState(false);
    const [capacity, setCapacity] = useState("");

    //HANDLE METHODS
    //start date and end date
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handlePayInAdvanceChange = () => {
        setPayInAdvance(!payInAdvance);
        console.log(payInAdvance);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    //location
    const handleLocationSelect = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
    };

    //ticket
    const handleTicketChange = (index, key, value) => {
        const updatedTickets = [...tickets];
        updatedTickets[index][key] = value;
        setTickets(updatedTickets);
    };

    const handleUnlimitedChange = () => {
        setIsUnlimited(!isUnlimited);
        if (isUnlimited) {
          setCapacity(""); // Clear the capacity when unlimited is checked
        }
        setCapacity(capacityRef.current.value);
      };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get("/getallcategories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [category]);

    const handleCreate = async (event) => {
        event.preventDefault();

        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        const formatedStartDate =
            sDate.getFullYear() +
            "-" +
            (sDate.getMonth() + 1) +
            "-" +
            sDate.getDate();
        const formatedEndDate =
            eDate.getFullYear() +
            "-" +
            (eDate.getMonth() + 1) +
            "-" +
            eDate.getDate();
        const ticketData = tickets.map((ticket) => ({
            price: ticket.price,
            amount: ticket.amount,
            name: ticket.name,
        }));

        //debug 
        console.log(startDate);
        console.log(endDate);

        if (formatedEndDate === formatedStartDate) {
            console.log("same date");
            if (selectedEndTime < selectedStartTime) {
                setIsError(true);
                setErrorMessage("End time cannot be before start time!");
                return;
            }
        }

        //creatiing request 
        const request = {
            name: nameRef.current.value,
            start_date: `${formatedStartDate} ${formatTime(
                selectedStartTime
            )} `,
            end_date: `${formatedEndDate} ${formatTime(selectedEndTime)} `,
            capacity: isUnlimited ? 99999999 : capacityRef.current.value,
            description: descriptionRef.current.value,
            category_id: category ? category.id : null,
            location_id: selectedLocation ? selectedLocation.id : null,
            pay_in_advance: payInAdvance,
            ticket_data: ticketData,
        };

        axiosClient
            .post("/createevent", request)
            .then((response) => {
                console.log("Response:", response);
                setIsError(false);
                setErrorMessage("Successfully created!");

                // Clear input values
                nameRef.current.value = "";
                capacityRef.current.value = "";
                descriptionRef.current.value = "";
                //TODO this nulling is not working so we leave the original value in the input
                // setCategory(null);
                // setSelectedLocation(null);
            })
            .catch((error) => {
                console.log("sem sme sa dostali");
                console.log("Error:", error);
                setIsError(true);
                setErrorMessage(
                    `Error creating event! ${error.response.data.message}`
                );
            });
    };

    const addTicket = () => {
        if (tickets.length < 3) {
            setTickets([...tickets, { name: "", price: "", amount: "" }]);
        }
    };

    const removeTicket = (index) => {
        if (tickets.length > 1) {
            const updatedTickets = [...tickets];
            updatedTickets.splice(index, 1);
            setTickets(updatedTickets);
        }
    };

    return (
        <div>
            <h1 className="create-event">Create your event!</h1>
            <input type="text" ref={nameRef} placeholder="Name" />
            <div>
                <label>Start Date:</label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    maxDate={endDate ? endDate : null}
                    dateFormat="yyyy-MM-dd"
                />
                <div>
                    <label>Select starting time:</label>
                    <TimePicker
                        start="00:00"
                        end="23:59"
                        format={24}
                        value={selectedStartTime}
                        onChange={(time) => setSelectedStartTime(time)}
                        step={15}
                    />
                </div>

                <label>End Date:</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                />
                <div>
                    <label>Select ending time:</label>
                    <TimePicker
                        start="00:00"
                        end="23:59"
                        format={24}
                        value={selectedEndTime}
                        onChange={(time) => setSelectedEndTime(time)}
                        step={15}
                    />
                </div>
            </div>
            <input type="text" ref={capacityRef} placeholder="capacity" disabled={isUnlimited} />
            <label htmlFor="unlimitedCheckbox">Unlimited</label>
            <input
                type="checkbox"
                id="unlimitedCheckbox"
                name="unlimitedCheckbox"
                onChange={handleUnlimitedChange}
                checked={isUnlimited}
            />
            <input type="text" ref={descriptionRef} placeholder="description" />
            <LocationDropdown onSelect={handleLocationSelect} />
            <h2 style={{ fontWeight: "bold" }}>Select a category:</h2>
            <div>
                {categories.map((category) => (
                    <CategoryDropdown
                        key={category.id}
                        category={category}
                        selectedCategory={category}
                        setCategory={setCategory}
                        lastClickedCategoryId={lastClickedCategoryId}
                        setLastClickedCategoryId={setLastClickedCategoryId}
                    />
                ))}
            </div>
            <div>
                <label htmlFor="paymentCheckbox">
                    Event requires payment in advance.
                </label>
                <input
                    type="checkbox"
                    id="paymentCheckbox"
                    name="paymentCheckbox"
                    onChange={handlePayInAdvanceChange}
                ></input>
                {tickets.map((ticket, index) => (
                    <div key={index}>
                        <label>Ticket:</label>
                        <input
                            type="text"
                            value={ticket.name}
                            placeholder="Name of the ticket"
                            onChange={(e) =>
                                handleTicketChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                        />
                        <input
                            type="text"
                            value={ticket.price}
                            placeholder="Price of the ticket"
                            onChange={(e) =>
                                handleTicketChange(
                                    index,
                                    "price",
                                    e.target.value
                                )
                            }
                        />
                        <input
                            type="text"
                            value={ticket.amount}
                            placeholder="Amount"
                            onChange={(e) =>
                                handleTicketChange(
                                    index,
                                    "amount",
                                    e.target.value
                                )
                            }
                        />
                        {index > 0 && (
                            <button onClick={() => removeTicket(index)}>
                                Remove Ticket
                            </button>
                        )}
                    </div>
                ))}
                {tickets.length < 3 && (
                    <button onClick={addTicket}>Add Ticket</button>
                )}

                <button onClick={handleCreate}>Create</button>
            </div>
            {errorMessage && (
                <div style={{ color: isError ? "red" : "green" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default CreateEvent;
