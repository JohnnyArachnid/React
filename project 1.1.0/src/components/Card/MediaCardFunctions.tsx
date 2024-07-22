import { FC, Fragment } from "react";
import { Divider, ListItem, ListItemText, } from '@mui/material';
import { Transgender, Male, Female, QuestionMark, Favorite, HeartBroken } from '@mui/icons-material';

export const CharacterDetails: FC<{ label: string; value?: string }> = ({ label, value }) => (
    <ListItem>
      <ListItemText primary={label} primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' } }} secondary={value || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)' } }} />
    </ListItem>
);

export const EpisodeListItem: FC<{ label: string[]; value: string[] }> = ({ label, value }) => (
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 0 }}>
      {value.map((item, index) => (
        <Fragment key={index}>
          <ListItemText primary={label[index]} primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' } }} secondary={item || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)' } }} sx={{ textAlign: 'center', flexBasis: `${100 / label.length}%` }} />
          {index !== value.length - 1 && <Divider orientation="vertical" flexItem />}
        </Fragment>
      ))}
    </ListItem>
);

export const CharacterStatusMark: FC<{ characterStatus?: string }> = ({ characterStatus }) => {
    const statusIcons = {
      Alive: <Favorite fontSize="large" />,
      Dead: <HeartBroken fontSize="large" />,
      default: <QuestionMark fontSize="large" />,
    };
    return statusIcons[characterStatus || 'default'] || statusIcons.default;
};

export const CharacterGenderMark: FC<{ characterGender?: string }> = ({ characterGender }) => {
    const genderIcons = {
      Female: <Female fontSize="large" />,
      Male: <Male fontSize="large" />,
      Genderless: <Transgender fontSize="large" />,
      default: <QuestionMark fontSize="large" />,
    };
    return genderIcons[characterGender || 'default'] || genderIcons.default;
};

export const ParseId = (id: string | undefined): number => {
    const numericId = id ? parseInt(id, 10) : 0;
    return numericId;
};