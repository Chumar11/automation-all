import React, { useState, useEffect } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Typography,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootStyled from "src/components/settings/styled";

const ContactFields = ({ ...props }) => {
  const { state, widget, isLoading, myState, setMyState, setState } = props;
  console.log("state", myState);
  const [fields, setFields] = useState(myState.fields || []);
  console.log("fields", fields);

  useEffect(() => {
    setFields(myState.fields || []);
  }, [myState.fields]);

  //   const onDragEnd = (result: any) => {
  //     if (!result.destination) {
  //       return;
  //     }

  //     const reorderedFields = [...fields];
  //     const [removed] = reorderedFields.splice(result.source.index, 1);
  //     reorderedFields.splice(result.destination.index, 0, removed);

  //     setFields(reorderedFields);
  //     setMyState({
  //       ...myState,
  //       fields: reorderedFields, // Update myState with new fields order
  //     });
  //   };
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedFields = [...fields];
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    // Reassign the id based on the new index
    const updatedFields = reorderedFields.map((field, index) => ({
      ...field,
      id: (index + 1).toString(),
    }));

    setFields(updatedFields);
    setMyState({
      ...myState,
      fields: updatedFields,
    });
  };

  // const addItem = () => {
  //   const newId = (fields.length + 1).toString();
  //   const newItem = {
  //     id: newId,
  //     name: `Field ${newId}`,
  //     placeholder: `Enter your ${newId}`,
  //     required: false,
  //   };

  //   const newFields = [...fields, newItem];
  //   setFields(newFields);
  //   setMyState({
  //     ...myState,
  //     fields: newFields,
  //   });
  // };

  //   const removeItem = (index: any) => {
  //     const newFields = [...fields];
  //     newFields.splice(index, 1);
  //     setFields(newFields);
  //     setMyState({
  //       ...myState,
  //       fields: newFields, // Update myState with removed fields
  //     });
  //   };
  const removeItem = (index: any) => {
    const newFields = [...fields];
    newFields.splice(index, 1);

    // Reassign the id based on the new index after removal
    const updatedFields = newFields.map((field, i) => ({
      ...field,
      id: (i + 1).toString(), // Assign new id based on index
    }));

    setFields(updatedFields);
    setMyState({
      ...myState,
      fields: updatedFields, // Update myState with removed fields and new ids
    });
  };

  const handleFieldChange = (index: any, property: any, value: any) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [property]: value };
    setFields(newFields);
    setMyState({
      ...myState,
      fields: newFields, // Update myState with modified fields
    });
  };

  return (
    <RootStyled>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any) => (
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ padding: "20px" }}
            >
              {fields.map((field: any, index: any) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Stack
                        marginBottom={"20px"}
                        padding={3}
                        bgcolor={"#f8f9fce6"}
                        sx={{
                          borderColor: "#dee2e6",
                          gap: "8px",
                          borderRadius: "8px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <Stack
                          spacing={1}
                          display={"grid"}
                          gridTemplateColumns={"1fr 1fr"}
                          gap={"20px"}
                        >
                          <Stack
                            gridColumn={"span 2"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              # {index + 1}
                            </Typography>
                            <IconButton
                              sx={{ fontSize: "20px" }}
                              size="small"
                              onClick={() => removeItem(index)}
                            >
                              <ClearRoundedIcon
                                sx={{ color: "black !important" }}
                              />
                            </IconButton>
                          </Stack>
                          <Stack sx={{ marginTop: "0px !important" }}>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              Name
                            </Typography>
                            <TextField
                              size="small"
                              type="text"
                              fullWidth
                              value={field.name}
                              onChange={(event) =>
                                handleFieldChange(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                            />
                          </Stack>
                          <Stack sx={{ marginTop: "0px !important" }}>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              Placeholder
                            </Typography>
                            <TextField
                              size="small"
                              type="text"
                              fullWidth
                              value={field.placeholder}
                              onChange={(event) =>
                                handleFieldChange(
                                  index,
                                  "placeholder",
                                  event.target.value
                                )
                              }
                            />
                          </Stack>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          justifyContent="space-between"
                        >
                          <FormControlLabel
                            sx={{ gap: "10px" }}
                            control={
                              <Checkbox
                                sx={{ padding: "0px !important" }}
                                checked={field.required}
                                onChange={(event) =>
                                  handleFieldChange(
                                    index,
                                    "required",
                                    event.target.checked
                                  )
                                }
                              />
                            }
                            label="Required to Fill"
                          />
                        </Stack>
                      </Stack>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      {/* <Button variant="contained" onClick={addItem}>
        Add Item
      </Button> */}
    </RootStyled>
  );
};

export default ContactFields;
