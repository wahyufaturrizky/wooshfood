{{- define "carwash-booking.name" -}}
carwash-booking
{{- end }}

{{- define "carwash-booking.fullname" -}}
{{ include "carwash-booking.name" . }}-{{ .Release.Name }}
{{- end }}