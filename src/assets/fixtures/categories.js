import CosmeticsSvg from '@/assets/images/icons/categories/Cosmetics.svg';
import FashionSvg from '@/assets/images/icons/categories/Fashion.svg';
import GadgetsSvg from '@/assets/images/icons/categories/Gadgets.svg';
import GroceriesSvg from '@/assets/images/icons/categories/Groceries.svg';
import BeautySvg from '@/assets/images/icons/categories/Beauty.svg';
import HouseholdSvg from '@/assets/images/icons/categories/Household.svg';
import PhotographySvg from '@/assets/images/icons/categories/Photography.svg';
import VideoSvg from '@/assets/images/icons/categories/Video.svg';
import DesignSvg from '@/assets/images/icons/categories/Design.svg';
import ProjectsSvg from '@/assets/images/icons/categories/Projects.svg';

const array = [
  {
    title: 'GADGETS',
    svg: GadgetsSvg,
  },
  {
    title: 'GROCERIES',
    svg: GroceriesSvg,
  },
  {
    title: 'COSMETICS',
    svg: CosmeticsSvg,
  },
  {
    title: 'PHOTOGRAPHY',
    svg: PhotographySvg,
  },
  {
    title: 'VIDEOGRAPHY',
    svg: VideoSvg,
  },
  {
    title: 'HOUSE-HOLD',
    svg: HouseholdSvg,
  },
  {
    title: 'FASHION',
    svg: FashionSvg,
  },
  {
    title: 'BEAUTY',
    svg: BeautySvg,
  },
  {
    title: 'DESIGN',
    svg: DesignSvg,
  },
  {
    title: 'PROJECTS',
    svg: ProjectsSvg,
  },
];

const selected = [array[2], array[6], array[1], array[0]];
selected[0].duration = 1000;
selected[1].duration = 1500;
selected[2].duration = 2000;
selected[3].duration = 2500;

export default selected;
