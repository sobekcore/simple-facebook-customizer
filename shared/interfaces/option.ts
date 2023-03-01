export interface Option {
  label: string;
  name: string;
  selector: string;
  style: string;
  depends?: Option;
}
