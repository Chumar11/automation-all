import { merge } from "lodash";

import Card from "./card";

import Tabs from "./tabs";
import Menu from "./menu";

import Link from "./link";
import Lists from "./lists";
import Table from "./table";
import Alert from "./alert";

import Paper from "./paper";
import Input from "./input";

import Drawer from "./drawer";
import Dialog from "./dialog";

import Button from "./button";
import Switch from "./switch";
import Select from "./select";
import SvgIcon from "./svgIcon";
import Tooltip from "./Tooltip";
import Popover from "./popover";
import Stepper from "./stepper";

import Skeleton from "./skeleton";
import Backdrop from "./backdrop";

import Checkbox from "./checkbox";

import Typography from "./Typography";
import Pagination from "./pagination";

import ButtonGroup from "./buttonGroup";
import ControlLabel from "./controlLabel";
import LoadingButton from "./loadingButton";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Tabs(theme),

    Card(theme),
    Menu(theme),

    Link(theme),
    Input(theme),

    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Select(theme),
    Button(theme),

    Dialog(theme),

    Drawer(theme),

    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),

    Skeleton(theme),

    Backdrop(theme),

    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),

    ControlLabel(theme),
    LoadingButton(theme)
  );
}
