import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from "@angular/animations";

var slideUp = [
  query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
    optional: true,
  }),
  group([
    query(
      ":enter",
      [
        style({ transform: "translateY(100%)" }),
        animate("0.6s ease", style({ transform: "translateY(0%)" })),
      ],
      { optional: true }
    ),
    query(
      ":leave",
      [
        style({ transform: "translateY(0%)" }),
        animate("0.6s ease", style({ transform: "translateY(-100%)" })),
      ],
      { optional: true }
    ),
  ]),
];

var slideDown = [
  query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
    optional: true,
  }),
  group([
    query(
      ":enter",
      [
        style({ transform: "translateY(-100%)" }),
        animate("0.6s ease", style({ transform: "translateY(0%)" })),
      ],
      { optional: true }
    ),
    query(
      ":leave",
      [
        style({ transform: "translateY(0%)" }),
        animate("0.6s ease", style({ transform: "translateY(100%)" })),
      ],
      { optional: true }
    ),
  ]),
];

export const slideInAnimation = trigger("routeAnimations", [
  transition("Dashboard => *", slideUp),
  transition("* => Dashboard", slideDown),
  transition("AddRecord => *", slideDown),
  transition("* => AddRecord", slideUp),
]);
